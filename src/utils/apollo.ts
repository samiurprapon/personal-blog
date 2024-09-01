import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import config from '~/configs/index';

const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			authorization: `Bearer ${config.githubConvertedToken}`,
		},
	};
});

export const client = new ApolloClient({
	link: authLink.concat(
		createHttpLink({
			uri: `https://api.github.com/graphql`,
		}),
	),
	cache: new InMemoryCache(),
});
