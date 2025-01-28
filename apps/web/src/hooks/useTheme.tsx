import { useContext } from 'react';
import { ThemeContext } from '~/contexts/ThemeContext';

export const useTheme = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);

	if (!theme) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}

	// Determine the returned theme
	const currentTheme =
		theme === 'system' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme;

	return { theme: currentTheme, toggleTheme };
};
