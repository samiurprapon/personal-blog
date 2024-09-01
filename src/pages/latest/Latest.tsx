import { useState, useEffect } from 'react';
import '~/assets/css/common.css';

import { StyleProvider } from '~/contexts/StyleContext';
import Layout from '~/layouts/Layout';

const Home = () => {
	const [isDark, setIsDark] = useState(false);
	// const [posts, setPosts] = useState([]);

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
				<Layout title={'Most readed articles'} label={'blog'} />
			</StyleProvider>
		</div>
	);
};

export default Home;
