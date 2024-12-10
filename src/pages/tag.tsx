import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader } from 'lucide-react';

// import Hero from '~/components/HeroSection';
import PostCard from '~/components/post/PostCard';

import Navigation from '~/components/header/Navigation';
import { Sidebar } from '~/components/sidebar/Sidebar';

import { useGetPostsByTagQuery } from '~/store/apis/posts';

function TagsPage() {
	const { tag } = useParams<{ tag: string }>();
	const [visiblePosts, setVisiblePosts] = useState<number>(3);
	const { isLoading, data, error } = useGetPostsByTagQuery(tag || '');

	const handleLoadMore = () => {
		setTimeout(() => {
			setVisiblePosts(visiblePosts + 3);
		}, 600);
	};

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return <div>Error: {(error as Error).message}</div>;
	}

	return (
		<>
			<Navigation />
			<main>
				{/* <Hero /> */}

				<div className="container-fluid">
					<div className="row">
						<div className="col-md-9">
							<div className="post-container">
								<h2 className="post-container__title_tag">
									{tag?.replace(
										/(\p{Emoji}|\p{Letter})/gu,
										(match, p1, offset, string) => {
											if (offset === 0) {
												return match.toUpperCase();
											} else if (string[offset - 1] === ' ') {
												return match.toUpperCase();
											}
											return match;
										},
									)}{' '}
									Posts
								</h2>
								{/* add a breadcrum */}
								<div className="post-container__breadcrumb">
									<span>~/</span>
									<Link to="/">🏠 Home</Link> <span>/</span> <span>{tag}</span>
								</div>

								<br />

								{data?.length === 0 && (
									<h3 className="post-container__notfound">
										No posts found for tag: {tag}
									</h3>
								)}
								<div className="post-container__grid">
									{(data || []).slice(0, visiblePosts).map((post, index) => (
										<PostCard post={post} key={index} />
									))}
								</div>

								{visiblePosts < (data || []).length && (
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

export default TagsPage;
