import { Link } from 'react-router-dom';
import Headroom from 'react-headroom';
import './header.css';

import { useStyle } from '~/contexts/StyleContext';
import Switch from '~/components/base/switch/Switch';

function Header() {
	const { isDark } = useStyle();

	return (
		<Headroom>
			<header
				className={
					isDark ? 'dark-menu header dark-shadow' : 'header light-shadow'
				}
			>
				<a
					href="https://samiurprapon.github.io"
					className={isDark ? 'dark-menu logo' : 'logo'}
					target="_blank"
					rel="noopener noreferrer"
				>
					<span className="grey-color"> &lt;</span>
					<span className="logo-name">{'SamiurPrapon'}</span>
					<span className="grey-color">/&gt;</span>
				</a>
				<input className="menu-btn" type="checkbox" id="menu-btn" />
				<label
					className="menu-icon"
					htmlFor="menu-btn"
					style={{ color: 'white' }}
				>
					<span className={isDark ? 'navicon navicon-dark' : 'navicon'}></span>
				</label>
				<ul className={isDark ? 'dark-menu menu' : 'menu'}>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/philosophy">Philosophy</Link>
					</li>
					<li>
						<Link to="/learning">Programmings</Link>
					</li>
					<li>
						<Link to="/projects">Projects</Link>
					</li>
					<li>
						<Link to="/tools">Tools</Link>
					</li>
					<li>
						<a>
							<Switch />
						</a>
					</li>
				</ul>
			</header>
		</Headroom>
	);
}

export default Header;
