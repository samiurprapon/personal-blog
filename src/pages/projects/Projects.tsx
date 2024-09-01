import { useState, useEffect } from 'react';
import '~/assets/css/common.css';

import { StyleProvider } from '~/contexts/StyleContext';
import Layout from '~/layouts/Layout';

const Project = () => {
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
				<Layout title={'Related Post'} label={'project'} />
			</StyleProvider>
		</div>
	);
};

export default Project;
