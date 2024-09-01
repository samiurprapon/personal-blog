import { useState, useEffect } from 'react';
import { StyleProvider } from '../../contexts/StyleContext';
import '~/assets/css/common.css';

import Layout from '~/layouts/Layout';

const Programming = () => {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const darkPref = window.matchMedia('(prefers-color-scheme: dark)');
		setIsDark(darkPref.matches);
	}, []);

	const changeTheme = () => {
		setIsDark((prevIsDark) => !prevIsDark);
	};

	return (
		<div className={isDark ? 'dark-mode' : 'light-mode'}>
			<StyleProvider value={{ isDark, changeTheme }}>
				<Layout title={'Related Post'} label={'programming'} />
			</StyleProvider>
		</div>
	);
};

export default Programming;
