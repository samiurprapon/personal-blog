import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import { client } from '~/utils/apollo';
import { StyleProvider } from '~/contexts/StyleContext';

import Header from '~/components/header/Header';
import Footer from '~/components/footer/Footer';
import Top from '~/components/base/topButton/TopButton';

import './App.css';

import Home from '~/pages/latest/Latest';
import Philosophy from '~/pages/philosophy/Philosophy';
import Programming from '~/pages/programming/Programming';
import Project from '~/pages/projects/Projects';
import Tools from '~/pages/tools/Tools';

import BlogPost from '~/pages/post/Post';

const App = () => {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const darkPref = window.matchMedia('(prefers-color-scheme: dark)');
		setIsDark(darkPref.matches);
	}, []);

	const changeTheme = () => {
		setIsDark((prevIsDark) => !prevIsDark);
	};

	return (
		<div className={isDark ? 'dark-mode' : ''}>
			<StyleProvider value={{ isDark, changeTheme }}>
				<ApolloProvider client={client}>
					<HashRouter>
						<Header />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/philosophy" element={<Philosophy />} />
							<Route path="/learning" element={<Programming />} />
							<Route path="/projects" element={<Project />} />
							<Route path="/tools" element={<Tools />} />
							<Route path="/:title/:issueNumber" element={<BlogPost />} />
						</Routes>
					</HashRouter>
					<Footer />
					<Top />
				</ApolloProvider>
			</StyleProvider>
		</div>
	);
};

export default App;
