import emoji from 'react-easy-emoji';
import { Fade } from 'react-awesome-reveal';
import './footer.css';

import { useStyle } from '~/contexts/StyleContext';

export default function Footer() {
	const { isDark } = useStyle();
	return (
		<Fade direction="down" duration={1000}>
			<div className="footer-div">
				<p className={isDark ? 'dark-mode footer-text' : 'footer-text'}>
					{emoji('Built top of GitHub APIs')}
				</p>
			</div>
		</Fade>
	);
}
