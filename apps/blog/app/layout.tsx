import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/providers';
import { DevelopmentBanner } from '@/components/DevelopmentBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: "Samiur Prapon's Blog",
	description: 'Personal diary to share my thoughts and experiences.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className} antialiased`}>
				<Providers>
					<DevelopmentBanner />
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	);
}
