import { GITHUB_API_URL, GITHUB_USERNAME } from '~/configs/environment';
import { ApiResponse, ApiErrorResponse, Year } from '~/interfaces/GithubAPI';

async function fetchCalendarData(
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

export async function fetchContributionsData(username: string, year?: Year) {
	const data = await fetchCalendarData(username, year);

	return data.contributions.map((item) => ({
		date: item.date,
		count: item.count,
	}));
}

export async function fetchDefaultReadme() {
	const readmeURL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_USERNAME}/refs/heads/master/README.md`;

	const response = await fetch(readmeURL);

	if (!response.ok) {
		throw new Error('Failed to fetch readme');
	}

	return response.text();
}
