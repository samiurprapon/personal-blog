import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import Loadable from '~/components/Loadable';
import MinimalLayout from '~/layouts/MinimalLayout';

const HomePage = Loadable(lazy(() => import('~/pages/home')));

const PublicRoutes: RouteObject = {
	element: <MinimalLayout />,
	children: [
		{
			path: '/',
			element: <HomePage />,
		},
	],
};

export default PublicRoutes;
