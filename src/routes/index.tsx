import { lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import Loadable from '~/components/Loadable';
import MinimalLayout from '~/layouts/MinimalLayout';
import PublicRoutes from '~/routes/public';

const Error = Loadable(lazy(() => import('~/pages/error')));

const router = createBrowserRouter(
	[
		PublicRoutes,
		{
			element: <MinimalLayout />,
			children: [
				{
					path: '*',
					element: <Error />,
				},
			],
		},
	],
	{
		basename: import.meta.env.VITE_APP_BASE_NAME,
		future: {
			v7_relativeSplatPath: true,
			v7_partialHydration: true,
			v7_fetcherPersist: true,
			v7_normalizeFormMethod: true,
			v7_skipActionErrorRevalidation: true,
		},
	},
);

export default router;
