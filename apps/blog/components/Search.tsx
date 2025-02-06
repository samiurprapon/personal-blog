'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';

export function Search() {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};
		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	return (
		<div className="w-full">
			<Button
				variant="ghost"
				className="text-muted-foreground relative h-9 w-full justify-start text-sm"
				onClick={() => setOpen(true)}
				aria-label="Search"
			>
				<SearchIcon className="mr-2 h-4 w-4" aria-hidden="true" />
				<span>Search...</span>
				<kbd className="bg-muted pointer-events-none absolute top-[50%] right-1.5 hidden h-5 translate-y-[-50%] items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex">
					<span className="text-xs">⌘</span>K
				</kbd>
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type to search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>Home</CommandItem>
						<CommandItem>Projects</CommandItem>
						<CommandItem>About</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</div>
	);
}
