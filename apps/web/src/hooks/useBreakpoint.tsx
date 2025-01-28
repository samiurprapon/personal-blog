import { useState, useEffect } from 'react';

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

const breakpoints = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
};

export const useBreakpoint = () => {
	const [breakpoint, setBreakpoint] = useState<Breakpoint>('lg');
	const [width, setWidth] = useState<number>(0);

	useEffect(() => {
		const handleResize = () => {
			const currentWidth = window.innerWidth;
			setWidth(currentWidth);

			if (currentWidth < breakpoints.sm) {
				setBreakpoint('sm');
			} else if (currentWidth < breakpoints.md) {
				setBreakpoint('md');
			} else if (currentWidth < breakpoints.lg) {
				setBreakpoint('lg');
			} else {
				setBreakpoint('xl');
			}
		};

		// Set initial width
		handleResize();

		// Add event listener
		window.addEventListener('resize', handleResize);

		// Cleanup
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return {
		breakpoint,
		width,
		isMobile: breakpoint === 'sm',
		isTablet: breakpoint === 'md',
		isDesktop: breakpoint === 'lg' || breakpoint === 'xl',
	};
};
