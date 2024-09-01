import moment from 'moment';
import Markdown from 'markdown-to-jsx';
import readingTime from 'reading-time';
import { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

import './post.css';

import config from '~/configs/index';
import Loader from '~/components/base/loader/Loader';
import RecentHeader from '~/components/recent/Header';
import RecentPost from '~/components/recent/Recent';

import Profile from '~/components/profile/Profile';

import { CodeBlock } from '~/components/base/markdown/Markdown';

import PostContainer from '~/components/post/PostContainer';
import PostTitle from '~/components/post/PostTitle';
import PostDate from '~/components/post/PostDate';
// import PostDateLink from "~/components/post/PostDateLink";
import PostReadingTime from '~/components/post/PostReadingTime';

import AuthorAvatar from '~/components/author/AuthorAvatar';
import AuthorName from '~/components/author/AuthorName';
import AuthorDetails from '~/components/author/AuthorDetails';
import { Post } from '~/interfaces/Post';

export default function BlogPost() {
	const issueNumber = parseInt(window.location.href.split('/').pop() as string);

	const GET_POSTS = gql`{
    repository(owner: "${config.githubUserName}", name: "${config.githubRepo}") {
      issue(number: ${issueNumber}) {
        isReadByViewer 
        title
        body
        bodyHTML
        url
        bodyText
        number
        bodyHTML
        author {
          url
          avatarUrl
          login
        }
        reactions(first:100){
          nodes{
            content
            user{
              id
              login
            }
          }
        }
        updatedAt
        id
        comments(first:100) {
          nodes {
            author {
              ... on User {
                avatarUrl
                name
                login
              }
            }
            body
            bodyHTML
            bodyText
            publishedAt
            updatedAt
          }
        }
      }
    }
  }
  `;
	const [post, setPost] = useState<Post>();
	const { loading, error, data } = useQuery(GET_POSTS);

	useEffect(() => {
		if (!loading) {
			if (data) {
				const issues = data.repository.issue;
				setPost(issues);
			}
		}
	}, [loading, error, data]);

	if (loading) {
		return <Loader />;
	}

	return (
		<div className="center">
			<section className="post">
				{post?.title && (
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
									{/* <PostDateLink href={post.url} target='_black'>
										View On Github
									</PostDateLink> */}
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
				)}
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
