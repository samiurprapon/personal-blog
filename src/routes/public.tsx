import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import Loadable from '~/components/Loadable';
import MinimalLayout from '~/layouts/MinimalLayout';

const HomePage = Loadable(lazy(() => import('~/pages/home')));
const MePage = Loadable(lazy(() => import('~/pages/me')));
const PasswordToolPage = Loadable(lazy(() => import('~/pages/password')));

const PublicRoutes: RouteObject = {
	element: <MinimalLayout />,
	children: [
		{
			path: '/',
			element: <HomePage />,
		},
		{
			path: '/me',
			element: <MePage />,
		},
		{
			path: '/tools/password-generator',
			element: <PasswordToolPage />,
		},
	],
};

export default PublicRoutes;
