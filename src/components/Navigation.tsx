import { useContext, useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

import { ThemeContext } from '~/contexts/ThemeContext';

const Navigation = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { theme, toggleTheme } = useContext(ThemeContext);

	const toggleMenu = () => setIsOpen(!isOpen);

	const getThemeIcon = () => {
		switch (theme) {
			case 'dark':
				return <Sun className="w-5 h-5" />;
			case 'light':
				return <Moon className="w-5 h-5" />;
			case 'system':
				// check if system theme is dark
				if (matchMedia('(prefers-color-scheme: dark)').matches) {
					return <Sun className="w-5 h-5" />;
				} else {
					return <Moon className="w-5 h-5" />;
				}
		}
	};
	const menuItems = [
		{ name: 'Latest', href: '/' },
		{ name: 'Projects', href: '/projects' },
		{ name: 'Tools', href: '/tools' },
		{ name: 'What I use', href: '/uses' },
		{ name: 'About', href: '/me' },
	];

	return (
		<nav className="navigation">
			<div className="navigation__container">
				<a className="navigation__logo" href="/">
					<span className="logo__brackets">&lt;</span>
					<span className="logo__username">SamiurPrapon</span>
					<span className="logo__brackets">/&gt;</span>
				</a>

				<div className="navigation__desktop-menu">
					{menuItems.map((item) => (
						<a key={item.name} href={item.href} className={`navigation__link`}>
							{item.name}
						</a>
					))}
					<button
						onClick={toggleTheme}
						className="navigation__theme-toggle"
						aria-label="Toggle theme"
					>
						{getThemeIcon()}
					</button>
				</div>

				<div className="navigation__mobile-menu">
					<button
						onClick={toggleTheme}
						className="navigation__theme-toggle"
						aria-label="Toggle theme"
					>
						{getThemeIcon()}
					</button>
					<button
						onClick={toggleMenu}
						className="navigation__mobile-menu-button"
						aria-expanded={isOpen}
					>
						{isOpen ? (
							<X className="w-6 h-6" aria-hidden="true" />
						) : (
							<Menu className="w-6 h-6" aria-hidden="true" />
						)}
					</button>
				</div>
			</div>

			{isOpen && (
				<div className="navigation__dropdown slide-down">
					{menuItems.map((item) => (
						<a
							key={item.name}
							href={item.href}
							className="navigation__dropdown-link"
						>
							{item.name}
						</a>
					))}
				</div>
			)}
		</nav>
	);
};

export default Navigation;
