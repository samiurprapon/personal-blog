'use client';

import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Search } from '@/components/Search';
import ThemeToggle from '@/components/ThemeToggle';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Command } from 'lucide-react';

import { MENU_ITEMS, TOOLS_ITEMS } from '@/config/config';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { NavigationSheet } from './NavigationSheet';

export default function Header() {
	return (
		<nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-accent sticky top-0 z-50 h-16 w-full border-b backdrop-blur">
			<div className="mx-auto flex h-full max-w-screen-xl items-center justify-between px-4 sm:px-6">
				<Logo />
				<Search />

				<NavigationMenu className="hidden md:block">
					<NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
						{MENU_ITEMS.map((item, index) =>
							index === 1 ? (
								<NavigationMenuItem key="tools">
									<NavigationMenuTrigger>Tools</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid w-[200px] gap-2 p-4">
											{TOOLS_ITEMS.map((item) => (
												<li key={item.name}>
													<NavigationMenuLink asChild>
														<Link
															href={item.path}
															className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
														>
															<div className="text-sm leading-none font-medium">{item.name}</div>
														</Link>
													</NavigationMenuLink>
												</li>
											))}
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
							) : (
								<NavigationMenuItem key={item.name}>
									<NavigationMenuLink asChild>
										<Link key={item.path} href={item.path}>
											{item.name}
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							),
						)}
					</NavigationMenuList>
				</NavigationMenu>

				<div className="flex items-center gap-3">
					<Button
						variant="outline"
						size="default"
						className="hidden sm:inline-flex"
						aria-label="Cmd+K"
						onClick={() => {
							// trigger cmd+k
						}}
					>
						<Command size={16} strokeWidth={2} aria-hidden="true" />K
					</Button>
					<ThemeToggle />
					<Avatar className="hidden md:block">
						<AvatarImage src="https://avatars.githubusercontent.com/u/25266703?v=4" />
					</Avatar>

					<div className="md:hidden">
						<NavigationSheet />
					</div>
				</div>
			</div>
		</nav>
	);
}
