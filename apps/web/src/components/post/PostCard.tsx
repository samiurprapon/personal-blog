import React from 'react';
import { Link } from 'react-router-dom';

import { Post } from '~/interfaces/Post.interface';

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
	return (
		<article className="post-card" key={post.id}>
			<img src={post.featuredImage} alt={post.title} loading="lazy" className="post-card__image" />
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
				<Link className="card__title-link" to={post.slug}>
					<h3 className="post-card__title">{post.title}</h3>
				</Link>
				<p className="post-card__excerpt">{post.excerpt}</p>
				<Link to={post.slug} className="post-card__read-more">
					Read More →
				</Link>
			</div>
		</article>
	);
};

export default PostCard;
