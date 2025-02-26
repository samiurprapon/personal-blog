import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import Link from 'next/link';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { MENU_ITEMS } from '@/config/config';

export const NavigationSheet = () => {
	return (
		<Sheet>
			<VisuallyHidden>
				<SheetTitle>Navigation Drawer</SheetTitle>
			</VisuallyHidden>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon">
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent>
				{/* <Logo /> */}
				<NavigationMenu className="mt:auto" orientation="vertical">
					<NavigationMenuList className="gap-6 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
						{MENU_ITEMS.map((item) => (
							<NavigationMenuItem key={item.name} className="px-4">
								<NavigationMenuLink asChild>
									<Link key={item.path} href={item.path}>
										{item.name}
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>
			</SheetContent>
		</Sheet>
	);
};
