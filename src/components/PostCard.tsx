import React from 'react';
import { Post } from '~/interfaces/Post.interface';

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
	return (
		<article className="post-card" key={post.slug}>
			<img
				src={post.coverImage}
				alt={post.title}
				loading="lazy"
				className="post-card__image"
			/>
			<div className="post-card__content">
				<div className="post-card__meta">
					<span className="post-card__tags">
						{post.tags.map((tag, index) => (
							<span className="tag" key={index}>
								{tag}
							</span>
						))}
					</span>
					<span className="post-card__read-time">{post.readTime}</span>
				</div>
				<h3 className="post-card__title">{post.title}</h3>
				<p className="post-card__excerpt">{post.excerpt}</p>
				<a href="#" className="post-card__read-more">
					Read More →
				</a>
			</div>
		</article>
	);
};

export default PostCard;
