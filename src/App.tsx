import { RouterProvider } from 'react-router-dom';

import router from '~/routes';
import Navigation from '~/components/Navigation';
import { useMemo } from 'react';

function App() {
	return (
		<div className="main-content">
			{useMemo(
				() => (
					<Navigation />
				),
				[],
			)}

			<RouterProvider router={router} />
		</div>
	);
}

export default App;
