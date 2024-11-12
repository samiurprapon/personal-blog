import { RouterProvider } from 'react-router-dom';

import router from '~/routes';
import Navigation from '~/components/Navigation';

function App() {
	return (
		<div className="main-content">
			<Navigation />
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
