import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import { useGetGithubIssuesQuery } from '~/store/apis/github';

const GithubIssues: React.FC = () => {
	const { isLoading, data, error } = useGetGithubIssuesQuery();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {(error as Error).message}</div>;
	}

	if (!data?.length) {
		return <div className="no-issues">No issues available at the moment</div>;
	}

	return (
		<div className="github-issues">
			{data.map((issue) => (
				<a
					key={issue.html_url}
					href={issue.html_url}
					target="_blank"
					rel="noopener noreferrer"
					className="issue-card"
				>
					<div className="issue-card__content">
						{/* if issue url '/issue/<number>  then show current icon or else show pr request icon */}
						{issue.html_url.includes('/issues/') ? (
							<div className="icon">
								<svg
									className="icon__svg"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h16M6 4v16M12 4v16M18 4v16"
									/>
								</svg>
							</div>
						) : (
							<div className="icon">
								<svg
									fill="var(--color-primary)"
									width="64px"
									height="64px"
									viewBox="-102.4 -102.4 716.80 716.80"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
									<g
										id="SVGRepo_tracerCarrier"
										strokeLinecap="round"
										strokeLinejoin="round"
									></g>
									<g id="SVGRepo_iconCarrier">
										<path d="M192,96a64,64,0,1,0-96,55.39V360.61a64,64,0,1,0,64,0V151.39A64,64,0,0,0,192,96ZM128,64A32,32,0,1,1,96,96,32,32,0,0,1,128,64Zm0,384a32,32,0,1,1,32-32A32,32,0,0,1,128,448Z"></path>
										<path d="M416,360.61V156a92.1,92.1,0,0,0-92-92H304V32a16,16,0,0,0-27.31-11.31l-64,64a16,16,0,0,0,0,22.62l64,64A16,16,0,0,0,304,160V128h20a28,28,0,0,1,28,28V360.61a64,64,0,1,0,64,0ZM384,448a32,32,0,1,1,32-32A32,32,0,0,1,384,448Z"></path>
									</g>
								</svg>
							</div>
						)}
						<div className="issue-info">
							<div className="issue-header">
								<p className="repo-name">../{issue.repo.split('/')[1]}</p>
								<span className="time-ago">
									{formatDistanceToNow(new Date(issue.updated_at))} ago
								</span>
							</div>
							<p className="issue-title">{issue.title}</p>
							<div className="labels">
								{issue.labels.slice(0, 2).map((label) => (
									<span
										key={label.name}
										className="label"
										style={{
											backgroundColor: `#${label.color}40`,
											// color: `#${label.color}`,
										}}
									>
										{label.name}
									</span>
								))}
								{issue.labels.length > 3 && (
									<span className="label more-labels">
										+{issue.labels.length - 3} more
									</span>
								)}
							</div>
						</div>
					</div>
				</a>
			))}
		</div>
	);
};

export default GithubIssues;
