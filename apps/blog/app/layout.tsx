import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { DevelopmentBanner } from '@/components/DevelopmentBanner';
import Footer from '@/sections/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: "Samiur Prapon's Blog",
	description: 'Personal diary to share my thoughts and experiences.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className} antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<DevelopmentBanner />
					<main>{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
