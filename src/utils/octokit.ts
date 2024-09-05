import { Octokit } from '@octokit/rest';
import config from '~/configs';

const octokit = new Octokit();

export default octokit;

export async function getIssueData(issueNumber: number) {
	const owner = config.githubUserName;
	const repo = config.githubRepo;

	try {
		// Fetch issue data
		const { data: issue } = await octokit.issues.get({
			owner: owner,
			repo,
			issue_number: issueNumber,
		});

		// Fetch issue comments
		const { data: comments } = await octokit.issues.listComments({
			owner: owner,
			repo,
			issue_number: issueNumber,
		});

		// Fetch issue reactions
		const { data: reactions } = await octokit.reactions.listForIssue({
			owner: owner,
			repo,
			issue_number: issueNumber,
		});

		// Construct the response object
		const response = {
			title: issue.title,
			body: issue.body,
			bodyHTML: issue.body_html,
			url: issue.html_url,
			bodyText: issue.body,
			number: issue.number,
			author: {
				url: issue.user.html_url,
				avatarUrl: issue.user.avatar_url,
				login: issue.user.login,
			},
			reactions: reactions.map((reaction) => ({
				content: reaction.content,
				user: {
					id: reaction.user.id,
					login: reaction.user.login,
				},
			})),
			updatedAt: issue.updated_at,
			id: issue.id,
			comments: comments.map((comment) => ({
				author: {
					avatarUrl: comment.user.avatar_url,
					name: comment.user.name,
					login: comment.user.login,
				},
				body: comment.body,
				bodyHTML: comment.body_html,
				bodyText: comment.body,
				publishedAt: comment.created_at,
				updatedAt: comment.updated_at,
			})),
		};

		return response;
	} catch (error) {
		console.error('Error fetching issue data:', error);
		throw error;
	}
}

export async function getPosts(label: string | null) {
	const user = config.githubUserName;
	const repo = config.githubRepo;

	if (!label) {
		label = 'blog';
	}

	const issues = await octokit.rest.issues.listForRepo({
		owner: user,
		repo: repo,
		labels: label,
		per_page: 100,
		sort: 'created',
		direction: 'desc',
	});

	console.log(issues);

	const responses = issues.data;

	return responses;
}
