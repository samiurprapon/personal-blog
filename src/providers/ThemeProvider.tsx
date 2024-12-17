import { FC, ReactNode, useState, useEffect } from 'react';
import { ThemeContext } from '~/contexts/ThemeContext';
import { Theme } from '~/interfaces/ThemeContextType';

interface ThemeProviderProps {
	children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
	const [theme, setTheme] = useState<Theme>(
		() => (localStorage.getItem('theme') as Theme) || 'system',
	);

	const updateTheme = (newTheme: Theme) => {
		const root = document.documentElement;
		root.classList.remove('light', 'dark');

		const effectiveTheme: Exclude<Theme, 'system'> =
			newTheme === 'system'
				? matchMedia('(prefers-color-scheme: dark)').matches
					? 'dark'
					: 'light'
				: newTheme;

		root.setAttribute('data-theme', effectiveTheme);
	};

	useEffect(() => {
		localStorage.setItem('theme', theme);
		updateTheme(theme);

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const handleSystemThemeChange = () => {
			if (theme === 'system') {
				updateTheme('system');
			}
		};

		mediaQuery.addEventListener('change', handleSystemThemeChange);

		return () => {
			mediaQuery.removeEventListener('change', handleSystemThemeChange);
		};
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme: Theme) => {
			if (prevTheme === 'light') {
				return 'dark';
			} else if (prevTheme === 'dark') {
				return 'light';
			} else if (prevTheme === 'system') {
				return matchMedia('(prefers-color-scheme: dark)').matches
					? 'light'
					: 'dark';
			} else {
				return 'system';
			}
		});
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
