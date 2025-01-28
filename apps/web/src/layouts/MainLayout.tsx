import { ReactNode } from 'react';
import ScrollToTop from '~/components/ScrollToTop';

function MainLayout({ children }: { children: ReactNode }) {
	return (
		<div className="main-content">
			<div id="top"></div>
			<ScrollToTop />
			{children}
		</div>
	);
}

export default MainLayout;
