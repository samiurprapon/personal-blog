import { useState } from 'react';
import { Loader } from 'lucide-react';

import Hero from '~/components/HeroSection';
import Navigation from '~/components/Navigation';
import PostCard from '~/components/PostCard';
import { Sidebar } from '~/components/Sidebar';

import fakePosts from '~/utils/fake';

function HomePage() {
	const [visiblePosts, setVisiblePosts] = useState<number>(3);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleLoadMore = () => {
		setIsLoading(true);

		setTimeout(() => {
			setVisiblePosts(visiblePosts + 3);
			setIsLoading(false);
		}, 600);
	};

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
									{fakePosts.slice(0, visiblePosts).map((post, index) => (
										<PostCard post={post} key={index} />
									))}
								</div>

								{visiblePosts < fakePosts.length && (
									<button
										className="post-container__load-more"
										onClick={handleLoadMore}
										disabled={isLoading} // Disable button while loading
									>
										{isLoading ? <Loader /> : 'Load More...'}
									</button>
								)}
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
