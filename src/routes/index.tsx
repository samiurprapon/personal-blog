import { lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import Loadable from '~/components/Loadable';
import PublicRoutes from '~/routes/public';

const Error = Loadable(lazy(() => import('~/pages/error')));

const router = createBrowserRouter(
	[
		PublicRoutes,
		{
			path: '*',
			element: <Error />,
		},
	],
	{
		basename: import.meta.env.VITE_APP_BASE_NAME,
	},
);

export default router;
