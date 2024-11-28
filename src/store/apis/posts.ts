import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Post } from '~/interfaces/Post.interface';

import mockPosts from '~/mocks/posts';

export const mockPostsApi = createApi({
	reducerPath: 'mockPostsApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/' }),
	endpoints: (builder) => ({
		// Fetch all local posts from mock data
		getPosts: builder.query<Post[], void>({
			queryFn: () => {
				return { data: mockPosts };
			},
		}),

		// Fetch local post by slug
		getPostBySlug: builder.query<Post | undefined, string>({
			queryFn: (slug) => {
				const post = mockPosts.find((p) => p.slug === slug);
				return { data: post };
			},
		}),

		// Fetch posts by tag
		getPostsByTag: builder.query<Post[], string>({
			queryFn: (tag) => {
				const filteredPosts = mockPosts.filter((p) => p.tags.includes(tag));
				return { data: filteredPosts };
			},
		}),
	}),
});

export const {
	useGetPostsQuery,
	useGetPostBySlugQuery,
	useGetPostsByTagQuery,
} = mockPostsApi;
