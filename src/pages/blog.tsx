import { Loader } from 'lucide-react';
import { useParams } from 'react-router-dom';
import Error404 from '~/components/error/Error404';

import Navigation from '~/components/header/Navigation';
import PostContent from '~/components/post/PostContent';
import PostHeader from '~/components/post/PostHeader';
import ReactionContainer from '~/components/post/ReactionContainer';

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
					{data ? (
						<div>
							<PostHeader post={data} />
							<PostContent content={data.content} />
							<div className="col-xs-12">
								<ReactionContainer post={data} />
							</div>
						</div>
					) : (
						<div className="centered-content">
							<div className="flex-justified-aligned">
								<Error404 />
								<h3 className="text-center bigger-text pt-md-4">
									Content not found!
								</h3>
							</div>
						</div>
					)}
				</div>
			</main>
		</>
	);
}

export default BlogPage;
