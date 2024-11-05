import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '~/styles/main.scss';

import App from '~/App';
import { ThemeProvider } from './contexts/ThemeContext';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</StrictMode>,
);
