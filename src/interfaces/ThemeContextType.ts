export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}
