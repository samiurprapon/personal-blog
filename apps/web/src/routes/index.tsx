import { createBrowserRouter } from 'react-router-dom';

import MinimalLayout from '~/layouts/MinimalLayout';
import PublicRoutes from '~/routes/public';

import Error from '~/routes/ErrorRoute';

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
	},
);

export default router;
