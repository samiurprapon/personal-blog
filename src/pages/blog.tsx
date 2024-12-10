import { Loader } from 'lucide-react';
import { useParams } from 'react-router-dom';
// import Hero from '~/components/HeroSection';
import Navigation from '~/components/header/Navigation';
import PostContent from '~/components/post/PostContent';
import PostHeader from '~/components/post/PostHeader';
import PostSidebar from '~/components/post/PostSidebar';

import { useGetPostBySlugQuery } from '~/store/apis/posts';

function BlogPage() {
	const { slug } = useParams<{ slug: string }>();
	const { isLoading, data, error } = useGetPostBySlugQuery('/blog/' + slug);

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
				<div className="blog-container">
					<div className="row">
						<div className="col-md-1"></div>
						<div className="col-md-8">
							{data ? (
								<div>
									<PostHeader post={data} />
								</div>
							) : null}
						</div>
						<div className="col-md-3">
							<PostSidebar />
						</div>
					</div>
					<div className="row">
						<div className="col-md-1"></div>
						<div className="col-md-8">
							{data ? (
								<div>
									<PostContent content={data.content} />
								</div>
							) : (
								<div className="text-center">Content not found</div>
							)}
						</div>
						<div className="col-md-3">
							<PostSidebar />
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export default BlogPage;
