import Hero from '~/components/HeroSection';
import Navigation from '~/components/Navigation';
import PostCard from '~/components/PostCard';
import { Sidebar } from '~/components/Sidebar';

import fakePosts from '~/utils/fake';

function HomePage() {
	return (
		<>
			<Navigation />
			<main>
				<Hero />

				<div className="container-fluid">
					<div className="row">
						<div className="col-md-9">
							<div className="post-container">
								<h2 className="post-container__title">Latest Articles</h2>

								<div className="post-container__grid">
									{fakePosts.map((post, index) => (
										<PostCard post={post} key={index} />
									))}
								</div>
							</div>
						</div>
						<div className="col-md-3">
							<Sidebar />
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export default HomePage;
