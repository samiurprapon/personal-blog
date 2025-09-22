import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import Loadable from '~/components/Loadable';
import MinimalLayout from '~/layouts/MinimalLayout';

const HomePage = Loadable(lazy(() => import('~/pages/home')));
const BlogPage = Loadable(lazy(() => import('~/pages/blog')));
const WriterPage = Loadable(lazy(() => import('~/pages/writer')));
const TagPage = Loadable(lazy(() => import('~/pages/tag')));
const MePage = Loadable(lazy(() => import('~/pages/me')));

const PasswordToolPage = Loadable(lazy(() => import('~/pages/password')));
const MarkdownToolPage = Loadable(lazy(() => import('~/pages/md-editor')));

const PublicRoutes: RouteObject = {
	element: <MinimalLayout />,
	children: [
		{
			path: '/',
			element: <HomePage />,
		},
		{
			path: '/write',
			element: <WriterPage />,
		},
		{
			path: '/tags/:tag',
			element: <TagPage />,
		},
		{
			path: '/me',
			element: <MePage />,
		},
		{
			path: '/tools/password-generator',
			element: <PasswordToolPage />,
		},
		{
			path: '/tools/markdown',
			element: <MarkdownToolPage />,
		},
		{
			path: '/blog/:slug',
			element: <BlogPage />,
		},
	],
};

export default PublicRoutes;
