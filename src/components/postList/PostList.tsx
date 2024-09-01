import { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

import config from '~/configs/index';
import Loader from '~/components/base/loader/Loader';

import BlogContainer from '~/components/base/container/BlogContainer';
import Card from '~/components/base/card/Card';

const GET_POSTS = (label: string) => {
	if (label == null) {
		label = 'blog';
	}
	return gql`
{
  repository(owner: "${config.githubUserName}", name: "${config.githubRepo}") {
    issues(first: 100, filterBy: { labels: "${label}" }, orderBy: { direction: DESC, field: CREATED_AT }) {
      nodes {
        title
        body
        bodyHTML
        bodyText
        number
        labels(first: 100) {
          nodes {
            color
            name
            id
          }
        }
        author {
          url
          avatarUrl
          login
        }
        updatedAt
        id
      }
    }
  }
}
`;
};

const PostList = (props: { label: string }) => {
	const [posts, setPosts] = useState([]);
	const { loading, error, data } = useQuery(GET_POSTS(props.label));

	useEffect(() => {
		if (!loading) {
			if (error) {
				console.error(error);
			}

			if (data) {
				setPosts(data?.repository?.issues?.nodes);
			}
		}
	}, [loading, error, data]);

	return (
		<div>
			<BlogContainer>
				{loading ? (
					<Loader />
				) : (
					posts.map((v, i) => {
						return <Card blog={v} key={i} />;
					})
				)}
			</BlogContainer>
		</div>
	);
};

export default PostList;
