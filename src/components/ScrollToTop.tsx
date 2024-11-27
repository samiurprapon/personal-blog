import { useCallback, useEffect, useState } from 'react';

const ScrollToTop = () => {
	const [showScroll, setShowScroll] = useState(false);

	const checkScrollTop = useCallback(() => {
		const offsetFromTop = window.scrollY;

		if (!showScroll && offsetFromTop > 350) {
			setShowScroll(true);
		} else if (offsetFromTop <= 350) {
			setShowScroll(false);
		}
	}, [showScroll]);

	useEffect(() => {
		window.addEventListener('scroll', checkScrollTop);
		return () => {
			window.removeEventListener('scroll', checkScrollTop);
		};
	}, [checkScrollTop]);

	const scrollUp = () => {
		const element = document.getElementById('top') as HTMLDivElement;
		element.scrollIntoView({
			behavior: 'smooth',
			block: 'end',
			inline: 'nearest',
		});
	};

	return (
		<div
			className={`scroll-up__container ${showScroll ? 'visible' : 'hidden'}`}
			onClick={scrollUp}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="28"
				height="28"
				viewBox="0 0 9.887 5.943"
			>
				<path
					id="Path_157"
					data-name="Path 157"
					d="M6502.544,2805l3.529,3.53-3.529,3.529"
					transform="translate(-2803.586 6507.073) rotate(-90)"
					fill="none"
					stroke="var(--bg-color)"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
				/>
			</svg>
		</div>
	);
};

export default ScrollToTop;
