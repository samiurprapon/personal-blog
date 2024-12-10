import React from 'react';
import { Post } from '~/interfaces/Post.interface';
import ShareButtons from './ShareButtons';

interface PostProps {
	post: Post;
}

const PostHeader: React.FC<PostProps> = ({ post }) => {
	return (
		<div className="post-header" key={post.id}>
			<img
				src={post.featuredImage}
				alt={post.title}
				loading="lazy"
				className="blog-container__image"
			/>
			<div className="blog-container__content">
				<div className="blog-container__meta">
					<span className="blog-container__tags">
						{post.tags.map((tag, index) => (
							<span className="tag" key={index}>
								{tag}
							</span>
						))}
					</span>
					<span className="blog-container__read-time">{post.readTime}</span>
					<span className="blog-container__share-buttons">
						<ShareButtons post={post} />
					</span>
				</div>
				<h2 className="blog-container__title">{post.title}</h2>
			</div>
		</div>
	);
};

export default PostHeader;
