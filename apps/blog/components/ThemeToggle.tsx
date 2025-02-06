'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ThemeToggle() {
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Ensure component only renders on the client
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null; // Prevents hydration mismatch

	return (
		<button
			className="rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
			onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
		>
			{resolvedTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
		</button>
	);
}
