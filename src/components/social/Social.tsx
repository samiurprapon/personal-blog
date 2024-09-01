import './social.css';

export default function socialMedia() {
	return (
		<div className="social-media-div">
			<a
				href={'https://github.com/samiurprapon'}
				className="icon-button github"
				target="_blank"
				rel="noopener noreferrer"
			>
				<i className="fab fa-github"></i>
				<span></span>
			</a>

			<a
				href={'https://www.linkedin.com/in/prapon/'}
				className="icon-button linkedin"
				target="_blank"
				rel="noopener noreferrer"
			>
				<i className="fab fa-linkedin-in"></i>
				<span></span>
			</a>

			<a
				href={`mailto:${'samiur.prapon@gmail.com'}`}
				className="icon-button google"
				target="_blank"
				rel="noopener noreferrer"
			>
				<i className="fab fa-google"></i>
				<span></span>
			</a>

			<a
				href={'https://www.facebook.com/prapon14'}
				className="icon-button facebook"
				target="_blank"
				rel="noopener noreferrer"
			>
				<i className="fab fa-facebook-f"></i>
				<span></span>
			</a>

			<a
				href={'https://medium.com/@samiur.prapon'}
				className="icon-button medium"
				target="_blank"
				rel="noopener noreferrer"
			>
				<i className="fab fa-medium"></i>
				<span></span>
			</a>

			<a
				href={'https://stackoverflow.com/users/9847838/prapon'}
				className="icon-button stack-overflow"
				target="_blank"
				rel="noopener noreferrer"
			>
				<i className="fab fa-stack-overflow"></i>
				<span></span>
			</a>
		</div>
	);
}
