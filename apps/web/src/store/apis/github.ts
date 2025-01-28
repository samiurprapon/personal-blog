import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ApiResponse, ApiErrorResponse, Year, GithubIssue } from '~/interfaces/GithubAPI';

import { GITHUB_API_URL, GITHUB_USERNAME } from '~/configs/environment';

const ISSUES_CACHE_KEY = 'github_issues_cache';
const ISSUES_CACHE_EXPIRY = 2 * 60 * 1000; // 2 minutes
const ISSUES_REPOSITORIES = ['samiurprapon/aether', 'samiurprapon/personal-blog'];

export const githubApi = createApi({
	reducerPath: 'githubApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.github.com',
	}),
	tagTypes: ['Contributions', 'Issues', 'Readme'],
	endpoints: (builder) => ({
		// Contribution Calendar Data
		getContributionsCalendar: builder.query<
			ApiResponse,
			{
				username: string;
				year?: Year;
			}
		>({
			query: ({ username, year = 'last' }) => ({
				url: `${GITHUB_API_URL}${username}?y=${year}`,
				method: 'GET',
			}),
			transformResponse: (response: ApiResponse | ApiErrorResponse) => {
				if ('error' in response) {
					throw new Error(`Fetching GitHub contribution data failed: ${response.error}`);
				}
				return response as ApiResponse;
			},
			providesTags: ['Contributions'],
		}),

		// Processed Contributions Data
		getContributions: builder.query<
			{
				total: number;
				contributions: Array<{ date: string; count: number }>;
			},
			{ username: string; year?: Year }
		>({
			query: ({ username, year = 'last' }) => ({
				url: `${GITHUB_API_URL}${username}?y=${year}`,
				method: 'GET',
			}),
			transformResponse: (response: ApiResponse, _meta, arg) => ({
				total: response.total[arg.year === 'last' ? 'lastYear' : arg.year || 'lastYear'],
				contributions: response.contributions.map((item) => ({
					date: item.date,
					count: item.count,
				})),
			}),
			providesTags: ['Contributions'],
		}),

		// GitHub Issues
		getGithubIssues: builder.query<GithubIssue[], void>({
			async queryFn(_arg, _queryApi, _extraOptions, baseQuery) {
				try {
					// Check for cached data
					const cachedData = localStorage.getItem(ISSUES_CACHE_KEY);
					if (cachedData) {
						const { data, timestamp } = JSON.parse(cachedData);
						if (Date.now() - timestamp < ISSUES_CACHE_EXPIRY) {
							return { data };
						}
					}

					// Fetch issues from all repositories
					const issues = await Promise.all(
						ISSUES_REPOSITORIES.map(async (repo) => {
							const response = await baseQuery({
								url: `/repos/${repo}/issues`,
								params: { state: 'open', per_page: 6 },
							});
							if (response.error) {
								return [];
							}
							const data = response.data as GithubIssue[];
							return data.map((issue) => ({ ...issue, repo }));
						}),
					);

					// Flatten, sort, and filter results
					const uniques: GithubIssue[] = [...new Set(issues.flat().sort((a, b) => b.number - a.number))];
					const filteredIssues = uniques.filter((issue) => !issue.labels.some((label) => label.name === 'blog'));

					// Cache results
					localStorage.setItem(ISSUES_CACHE_KEY, JSON.stringify({ data: filteredIssues, timestamp: Date.now() }));

					return { data: filteredIssues };
				} catch (error) {
					// console.error('Error fetching GitHub issues:', error);
					return { error: { status: 'FETCH_ERROR', error: String(error) } };
				}
			},
			providesTags: ['Issues'],
			keepUnusedDataFor: 60, // 1 minute
		}),

		// Default Readme
		getDefaultReadme: builder.query<string, void>({
			query: () => ({
				url: `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_USERNAME}/refs/heads/master/README.md`,
				method: 'GET',
				responseHandler: 'text', // treat response as text
			}),
			providesTags: ['Readme'],
			keepUnusedDataFor: 2 * 60, // 2 minutes
		}),
	}),
});

// Export hooks for usage in components
export const {
	useGetContributionsCalendarQuery,
	useGetContributionsQuery,
	useGetGithubIssuesQuery,
	useGetDefaultReadmeQuery,
} = githubApi;
