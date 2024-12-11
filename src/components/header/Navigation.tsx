import { useContext, useState, memo, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
	Menu,
	X,
	Sun,
	Moon,
	Command,
	Blend,
	KeyRound,
	ChevronDown,
	User,
} from 'lucide-react';

import { ThemeContext } from '~/contexts/ThemeContext';
import ProfileButton from '~/components/header/ProfileButton';

const Navigation = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isToolsOpen, setIsToolsOpen] = useState(false);
	const { theme, toggleTheme } = useContext(ThemeContext);

	const location = useLocation();

	const toggleMenu = () => setIsOpen(!isOpen);
	const toggleTools = () => setIsToolsOpen(!isToolsOpen);

	const isActive = (path: string) => location.pathname === path;
	const isToolActive = () =>
		toolsItems.some((item) => location.pathname === item.path);

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
		{ name: 'Latest', path: '/' },
		{ name: 'Projects', path: '/projects' },
		{ name: 'Use?', path: '/uses' },
		{ name: 'Bucket', path: '/bucket' },
		{ name: 'About', path: '/me' },
	];

	const toolsItems = [
		{
			name: 'Markdown Editor',
			path: '/tools/markdown',
			icon: <Command className="icon" />,
		},
		{
			name: 'Color Generator',
			path: '/tools/color-generator',
			icon: <Blend className="icon" />,
		},
		{
			name: 'Password Generator',
			path: '/tools/password-generator',
			icon: <KeyRound className="icon" />,
		},
	];

	return (
		<nav className="navigation">
			<div className="navigation__container">
				<Link className="navigation__logo" to="/">
					<span className="logo__brackets">&lt;</span>
					<span className="logo__username">SamiurPrapon</span>
					<span className="logo__brackets">/&gt;</span>
				</Link>

				<div className="navigation__desktop-menu">
					{menuItems.map((item, index) => (
						<Fragment key={item.name}>
							{index === menuItems.length - 2 && (
								<div className="navigation__tools-dropdown">
									<button
										onClick={toggleTools}
										className={`navigation__link navigation__tools-button ${isToolActive() ? 'navigation__link--active' : ''}`}
										aria-expanded={isToolsOpen}
									>
										{/* <Wrench className="icon" /> */}
										<span>Tools</span>
										<ChevronDown
											className={`icon ${isToolsOpen ? 'rotate' : ''}`}
										/>
									</button>

									{isToolsOpen && (
										<div className="navigation__tools-menu fade-in">
											{toolsItems.map((item) => (
												<Link
													key={item.name}
													to={item.path}
													className={`navigation__tools-item ${isActive(item.path) ? 'navigation__tools-item--active' : ''}`}
												>
													{item.icon}
													<span>{item.name}</span>
												</Link>
											))}
										</div>
									)}
								</div>
							)}

							<Link
								key={item.name}
								to={item.path}
								className={`navigation__link ${isActive(item.path) ? 'navigation__link--active' : ''}`}
							>
								{item.name}
							</Link>
						</Fragment>
					))}

					<button
						onClick={toggleTheme}
						className="navigation__theme-toggle"
						aria-label="Toggle theme"
					>
						{getThemeIcon()}
					</button>

					<ProfileButton />
				</div>

				<div className="navigation__mobile-menu">
					<button
						onClick={toggleTheme}
						className="navigation__theme-toggle"
						aria-label="Toggle theme"
					>
						{getThemeIcon()}
					</button>

					<Link
						className="navigation__theme-toggle"
						aria-label="Toggle theme"
						to={'/me'}
					>
						<User width={24} height={24} />
					</Link>

					<button
						onClick={toggleMenu}
						className="navigation__mobile-menu-button"
						aria-expanded={isOpen}
					>
						{isOpen ? (
							<X className="icon" aria-hidden="true" />
						) : (
							<Menu className="icon" aria-hidden="true" />
						)}
					</button>
				</div>
			</div>

			{isOpen && (
				<div className="navigation__dropdown slide-down">
					{menuItems.map((item, index) => (
						<Fragment key={item.name}>
							{index === menuItems.length - 2 && (
								<>
									<div className="navigation__tools-dropdown">
										<button
											onClick={toggleTools}
											className={`navigation__dropdown-link navigation__tools-button ${isToolActive() ? 'navigation__link--active' : ''}`}
											aria-expanded={isToolsOpen}
										>
											{/* <Wrench className="icon" /> */}
											<span>Tools</span>
											<ChevronDown
												className={`icon ${isToolsOpen ? 'rotate' : ''}`}
											/>
										</button>
									</div>

									{isToolsOpen && (
										<div className="navigation__dropdown-section fade-in">
											{toolsItems.map((item) => (
												<Link
													key={item.name}
													to={item.path}
													className={`navigation__dropdown-link navigation__dropdown-link--indented ${
														isActive(item.path)
															? 'navigation__dropdown-link--active'
															: ''
													}`}
												>
													{item.icon}
													<span>{item.name}</span>
												</Link>
											))}
										</div>
									)}
								</>
							)}

							<Link
								key={item.name}
								to={item.path}
								className={`navigation__dropdown-link ${isActive(item.path) ? 'navigation__dropdown-link--active' : ''}`}
								onClick={() => setIsOpen(false)}
							>
								<span>{item.name}</span>
							</Link>
						</Fragment>
					))}
				</div>
			)}
		</nav>
	);
};

export default memo(Navigation);
