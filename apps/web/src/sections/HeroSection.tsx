import { FULL_NAME, GITHUB_PROFILE_URL } from '~/configs/environment';

const HeroSection: React.FC = () => {
	return (
		<div className='hero'>
			<div className='hero-background'>
				<div className='hero-content'>
					<div className='text-center'>
						<img src={GITHUB_PROFILE_URL} alt='Profile' className='profile-image' />
						<h1 className='hero-title'>
							Hi, I&apos;m <span className='highlight'>{FULL_NAME}</span>
						</h1>
						<p className='hero-subtitle'>💥 Break Code • 🤪 Write PR • 😂 Learn Laughorithm</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
