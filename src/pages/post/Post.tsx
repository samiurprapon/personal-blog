import { useState, useEffect } from 'react';
import moment from 'moment';
import Markdown from 'markdown-to-jsx';
import readingTime from 'reading-time';
import { getIssueData } from '~/utils/octokit';

import './post.css';

import Loader from '~/components/base/loader/Loader';
import RecentHeader from '~/components/recent/Header';
import RecentPost from '~/components/recent/Recent';
import Profile from '~/components/profile/Profile';
import { CodeBlock } from '~/components/base/markdown/Markdown';
import PostContainer from '~/components/post/PostContainer';
import PostTitle from '~/components/post/PostTitle';
import PostDate from '~/components/post/PostDate';
import PostReadingTime from '~/components/post/PostReadingTime';
import AuthorAvatar from '~/components/author/AuthorAvatar';
import AuthorName from '~/components/author/AuthorName';
import AuthorDetails from '~/components/author/AuthorDetails';
import { Post } from '~/interfaces/Post';

export default function BlogPost() {
	const [post, setPost] = useState<Post | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const issueNumber = parseInt(window.location.href.split('/').pop() as string);

	useEffect(() => {
		async function fetchPost() {
			try {
				const data = await getIssueData(issueNumber);

				setPost({ ...data });
				setLoading(false);
			} catch (err) {
				setError(err instanceof Error ? err : new Error('An error occurred'));
				setLoading(false);
			}
		}

		fetchPost();
	}, [issueNumber]);

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!post) {
		return <div>No post found</div>;
	}

	return (
		<div className="center">
			<section className="post">
				<PostContainer>
					<PostTitle>{post.title}</PostTitle>

					<div className="meta-post">
						<AuthorDetails>
							<AuthorAvatar
								src={post.author.avatarUrl}
								alt={post.author.login}
							/>
							<div>
								<AuthorName>{post.author.login}</AuthorName>
								<PostReadingTime>
									{readingTime(post.body).minutes} Min Read.
								</PostReadingTime>
								<PostDate>
									{moment(post.updatedAt).format('Do MMM YYYY')}
								</PostDate>
							</div>
						</AuthorDetails>
					</div>
					<div className="article">
						<Markdown
							options={{
								overrides: {
									pre: {
										component: CodeBlock,
									},
									slugify: (str) => str,
									wrapper: 'aside',
								},
							}}
						>
							{post.body}
						</Markdown>
					</div>
				</PostContainer>
			</section>

			<section className="sidebar">
				<div className="items">
					<RecentHeader title={'Related Post'} />
					<RecentPost />
					<RecentPost />
					<RecentPost />
					<br />
				</div>

				<div className="items">
					<Profile />
				</div>
			</section>
		</div>
	);
}
