import { RouterProvider } from 'react-router-dom';

import router from '~/routes';
import MainLayout from '~/layouts/MainLayout';

function App() {
	return (
		<MainLayout>
			<RouterProvider router={router} />
		</MainLayout>
	);
}

export default App;
