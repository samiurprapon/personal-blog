import { Fade } from 'react-awesome-reveal';
import './recent.css';

export default function RecentPost() {
	return (
		<Fade direction="down" duration={900}>
			<div className="card">
				<div className="blogList">
					<div className="blogImg">
						<img
							className="image"
							src={
								'https://photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg'
							}
							alt={''}
						/>
					</div>

					<div className="blog-body">
						<div className="category">Philosophy</div>
						<div className="reading-time">3 min</div>

						<h4 className="title">World is Diamond Shaped</h4>
						<p className="blog-time">June 7, 2017</p>
					</div>
				</div>
			</div>
		</Fade>
	);
}
