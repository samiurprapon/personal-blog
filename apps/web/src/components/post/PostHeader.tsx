import type React from 'react';
import type { Post } from '~/interfaces/Post.interface';

import { Volume2 } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

interface PostProps {
	post: Post;
}

const PostHeader: React.FC<PostProps> = ({ post }) => {
	return (
		<div className='post-header' key={post.id}>
			<Toaster
				position='top-right'
				toastOptions={{
					duration: 3000,
					style: {
						backgroundColor: 'var(--color-background)',
						color: 'var(--color-text)',
					},
				}}
			/>
			<h2 className='blog-container__title'>{post.title}</h2>
			<div className='blog-container__meta'>
				<span className='blog-container__tags'>
					{post.tags.map((tag, index) => (
						<span className='tag' key={index}>
							{tag}
						</span>
					))}
				</span>
				<div className='blog-container__read-time'>
					<div className='blog-container__time'>{post.readTime}</div>
					<button
						type='button'
						className='blog-container__speak'
						onClick={() => {
							toast.loading('Reading feature not implemented yet!');
						}}>
						<Volume2 size={22} className='speak-svg' />
					</button>
				</div>
			</div>
			<img src={post.featuredImage} alt={post.title} loading='lazy' className='blog-container__image' />
		</div>
	);
};

export default PostHeader;
