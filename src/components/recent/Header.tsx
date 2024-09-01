import { Fade } from 'react-awesome-reveal';
import './header.css';

interface RecentHeaderProps {
	title: string;
}

export default function RecentHeader(props: RecentHeaderProps) {
	return (
		<Fade direction="down" duration={1000}>
			<div className="main">
				<div className="row">
					<h1 className="prof-title">{props.title}</h1>
				</div>
			</div>
		</Fade>
	);
}
