export interface Post {
	title: string;
	body: string;
	bodyHTML: string;
	bodyText: string;
	number: number;
	updatedAt: string;
	author: {
		avatarUrl: string;
		login: string;
	};
	labels: {
		nodes: {
			color: string;
			name: string;
			id: string;
		}[];
	};
}
