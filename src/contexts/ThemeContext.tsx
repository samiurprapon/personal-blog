import React, { createContext, useState, useEffect } from 'react';
import { ThemeContextType } from '~/interfaces/ThemeContextType';

export const ThemeContext = createContext<ThemeContextType>({
	theme: 'light',
	toggleTheme: () => {},
});

interface ThemeProviderProps {
	children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(
		() =>
			(localStorage.getItem('theme') as 'light' | 'dark' | 'system') ||
			'system',
	);

	useEffect(() => {
		localStorage.setItem('theme', theme);

		document.body.classList.remove('light', 'dark');

		document.body.classList.add(
			theme === 'system'
				? matchMedia('(prefers-color-scheme: dark)').matches
					? 'dark'
					: 'light'
				: theme,
		);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) =>
			prevTheme === 'light'
				? 'dark'
				: prevTheme === 'dark'
					? 'system'
					: 'light',
		);
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
