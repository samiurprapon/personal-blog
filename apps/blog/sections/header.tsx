'use client';

import { LoginButton } from '@/components/LoginButton';
import { Logo } from '@/components/Logo';
import { Search } from '@/components/Search';
import { ThemeToggle } from '@/components/ThemeToggle';

import { MENU_ITEMS } from '@/config/config';
import Link from 'next/link';

export default function Header() {
	return (
		<header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
			<nav className="container mx-auto flex h-16 items-center justify-between">
				{/* logo section */}
				<div className="mx-auto flex items-center space-x-2">
					<Logo />
				</div>
				{/* search bar (cmdk) */}
				<div className="mx-auto hidden max-w-2xl flex-1 items-center justify-center px-4 md:flex md:px-8">
					<Search />
				</div>
				{/* Menu section */}
				<div className="hidden items-center space-x-6 md:flex">
					{MENU_ITEMS.map((item) => (
						<Link key={item.path} href={item.path}>
							{item.name}
						</Link>
					))}
				</div>
				{/* Theme toggle */}
				<div className="hidden items-center space-x-6 md:flex">
					<ThemeToggle />
				</div>
				{/* Language toogle */}
				<LoginButton />
				{/* login button/ Avatar */}
			</nav>
		</header>
	);
}
