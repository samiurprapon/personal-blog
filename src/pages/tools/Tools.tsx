import React, { useState, useEffect } from 'react';
import '~/assets/css/common.css';

import { StyleProvider } from '~/contexts/StyleContext';
import Layout from '~/layouts/Layout';

const Tools: React.FC = () => {
	const [isDark, setIsDark] = useState<boolean>(false);

	useEffect(() => {
		const darkPref = window.matchMedia('(prefers-color-scheme: dark)');
		setIsDark(darkPref.matches);
	}, []);

	const changeTheme = () => {
		setIsDark((prevIsDark) => !prevIsDark);
	};

	return (
		<div className={isDark ? 'dark-mode' : undefined}>
			<StyleProvider value={{ isDark, changeTheme }}>
				<Layout title="Related Post" label="tools" />
			</StyleProvider>
		</div>
	);
};

export default Tools;
