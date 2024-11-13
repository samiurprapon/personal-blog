import { ReactNode } from 'react';

function MainLayout({ children }: { children: ReactNode }) {
	return <div className="main-content">{children}</div>;
}

export default MainLayout;
