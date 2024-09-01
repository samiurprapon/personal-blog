import emoji from 'react-easy-emoji';
import { Fade } from 'react-awesome-reveal';
import './GithubProfile.css';

import SocialMedia from '~/components/social/Social';
import { ProfileProps } from '~/interfaces/profile';

export default function GithubProfileCard({
	props,
}: {
	props: ProfileProps | undefined;
}) {
	return (
		<Fade direction="down" duration={1000}>
			<div className="main">
				<h1 className="prof-title">Author</h1>
				<div className="row">
					<div className="image-content-profile">
						<img
							src={props?.avatarUrl}
							alt={props?.name}
							className="profile-image"
						/>
					</div>
					<div className="main-content-profile">
						<h2 className="bio-text">"{emoji(String(props?.bio) + '"')}</h2>
						<SocialMedia />
					</div>
				</div>
			</div>
		</Fade>
	);
}
