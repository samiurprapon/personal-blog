import { createContext } from 'react';
import type { ThemeContextType } from '~/interfaces/ThemeContextType';

export const ThemeContext = createContext<ThemeContextType>({
	theme: 'dark',
	toggleTheme: () => {
		// Default no-op implementation
	},
});
