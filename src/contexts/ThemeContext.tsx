import { createContext } from 'react';
import { ThemeContextType } from '~/interfaces/ThemeContextType';

export const ThemeContext = createContext<ThemeContextType>({
	theme: 'dark',
	toggleTheme: () => {},
});
