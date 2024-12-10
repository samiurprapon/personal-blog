export interface Activity {
	date: string;
	count: number;
	level: 0 | 1 | 2 | 3 | 4;
}

export type Year = number | 'last';

export interface ApiResponse {
	total: {
		[year: number]: number;
		[year: string]: number;
	};
	contributions: Array<Activity>;
}

export interface ApiErrorResponse {
	error: string;
}

export interface GithubIssue {
	html_url: string;
	number: number;
	title: string;
	created_at: string;
	updated_at: string;
	repo: string;
	repository_url: string;
	labels: { name: string; color: string }[];
}
