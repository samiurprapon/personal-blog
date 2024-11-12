import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '~/styles/main.scss';

import { ThemeProvider } from '~/contexts/ThemeContext';
import App from '~/App';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</StrictMode>,
);
