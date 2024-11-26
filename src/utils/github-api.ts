import { GITHUB_API_URL, GITHUB_USERNAME } from '~/configs/environment';
import {
	ApiResponse,
	ApiErrorResponse,
	Year,
	GithubIssue,
} from '~/interfaces/GithubAPI';

export async function fetchCalendarData(
	username: string,
	year?: Year,
): Promise<ApiResponse> {
	const response = await fetch(
		`${GITHUB_API_URL}${username}?y=${year ? year : 'last'}`,
	);

	const data = (await response.json()) as ApiResponse | ApiErrorResponse;

	if (!response.ok) {
		throw Error(
			`Fetching GitHub contribution data for "${username}" failed: ${(data as ApiErrorResponse).error}`,
		);
	}

	return data as ApiResponse;
}

export async function fetchContributionsData(
	username: string,
	year: Year = 'last',
) {
	const data = await fetchCalendarData(username, year);

	return {
		total: year === 'last' ? data.total['lastYear'] : data.total[year],
		contributions: data.contributions.map((item) => ({
			date: item.date,
			count: item.count,
		})),
	};
}

export async function fetchDefaultReadme() {
	const readmeURL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_USERNAME}/refs/heads/master/README.md`;

	const response = await fetch(readmeURL);

	if (!response.ok) {
		throw new Error('Failed to fetch readme');
	}

	return response.text();
}

export async function fetchGithubIssues(): Promise<GithubIssue[]> {
	const repos = ['samiurprapon/aether', 'samiurprapon/personal-blog'];
	// const repos = ['facebook/react'];

	try {
		const cacheKey = 'github_issues_cache';
		const cachedData = localStorage.getItem(cacheKey);
		const cacheExpiry = 2 * 60 * 1000; // 2 minute

		if (cachedData) {
			const { data, timestamp } = JSON.parse(cachedData);
			if (Date.now() - timestamp < cacheExpiry) {
				return data;
			}
		}

		const issues = await Promise.all(
			repos.map(async (repo) => {
				const response = await fetch(
					`https://api.github.com/repos/${repo}/issues?state=open&per_page=6`,
				);

				if (!response.ok) {
					return [];
				}

				const data = await response.json();

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				return data.map((issue: any) => ({
					...issue,
					repo,
				}));
			}),
		);

		const uniques: GithubIssue[] = [
			...new Set(issues.flat().sort((a, b) => b.number - a.number)),
		];

		// check if any issues has 'dependencies' label then skip that
		const filteredIssues = uniques
			.flat()
			.filter((issue) => !issue.labels.some((label) => label.name === 'blog'));

		localStorage.setItem(
			cacheKey,
			JSON.stringify({ data: filteredIssues.flat(), timestamp: Date.now() }),
		);

		return filteredIssues;
	} catch (error) {
		console.error('Error fetching GitHub issues:', error);
		return [];
	}
}
