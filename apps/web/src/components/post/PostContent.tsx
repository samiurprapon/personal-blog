import Markdown from 'markdown-to-jsx';
import type React from 'react';

interface PostContentProps {
	content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
	return (
		<div className='blog-container__wrapper'>
			<Markdown options={{ wrapper: 'article' }}>{content}</Markdown>
		</div>
	);
};

export default PostContent;
