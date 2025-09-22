import { useState } from 'react';
import { Heart } from 'lucide-react';

import ShareButtons from '~/components/post/ShareButtons';
import type { Post } from '~/interfaces/Post.interface';

interface PostProps {
	post: Post;
}

function ReactionContainer({ post }: PostProps) {
	const [isLoved, setIsLoved] = useState<boolean>(false);
	const [reactionCount, setReactionCount] = useState<number>(68);

	const handleClick = () => {
		setIsLoved(!isLoved);
		setReactionCount(isLoved ? reactionCount - 1 : reactionCount + 1); // Toggle the count based on whether the button was already loved
	};

	return (
		<div className='reaction-container'>
			<button type='button' className='love-button' onClick={handleClick}>
				<Heart
					size={24}
					fill={isLoved ? '#ff6881' : 'transparent'}
					stroke={isLoved ? '#ff6881' : 'var(--color-text)'}
				/>
				<span className='reaction-count'>{reactionCount}</span>
			</button>
			<ShareButtons post={post} />
		</div>
	);
}

export default ReactionContainer;
