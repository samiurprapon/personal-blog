import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '~/store';

import '~/styles/main.scss';

import { ThemeProvider } from '~/providers/ThemeProvider';
import App from '~/App';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeProvider>
	</StrictMode>,
);
