import Markdown from 'markdown-to-jsx';
import React from 'react';

interface PostContentProps {
	content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
	return (
		<div className="github__readme-wrapper">
			<Markdown options={{ wrapper: 'article' }}>{content}</Markdown>
		</div>
	);
};

export default PostContent;
