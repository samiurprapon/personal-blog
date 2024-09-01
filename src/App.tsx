import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/Apollo';
import { StyleProvider } from './contexts/StyleContext';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Top from './components/topbutton/Top';

import './App.css';

import Home from './containers/Home/Home';
import Philosophy from './containers/Philosophy/Philosophy';
import Programming from './containers/Programming/Programming';
import Project from './containers/Project/Project';
import Tools from './containers/Tools/Tools';

import BlogPost from './containers/BlogPost/BlogPost';

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
