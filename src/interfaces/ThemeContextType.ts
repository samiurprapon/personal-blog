export interface ThemeContextType {
	theme: 'light' | 'dark' | 'system';
	toggleTheme: () => void;
}
