'use client';

// import { ThemeProvider, useTheme } from 'next-themes';
import { ThemeProvider } from 'next-themes';

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
	// const { setTheme, resolvedTheme } = useTheme();

	return (
		<ThemeProvider enableSystem attribute="class" defaultTheme="system" disableTransitionOnChange>
			{children}
		</ThemeProvider>
	);
}
