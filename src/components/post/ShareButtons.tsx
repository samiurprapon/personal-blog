import React from 'react';
import {
	FacebookShareButton,
	TwitterShareButton,
	LinkedinShareButton,
	FacebookIcon,
	TwitterIcon,
	LinkedinIcon,
} from 'react-share';
import { Post } from '~/interfaces/Post.interface';

interface ShareButtonsProps {
	post: Post;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ post }) => {
	return (
		<div className="blog-container__tags">
			<FacebookShareButton url={post.slug} title={post.title}>
				<FacebookIcon size={32} round />
			</FacebookShareButton>

			<TwitterShareButton url={post.slug} title={post.title}>
				<TwitterIcon size={32} round />
			</TwitterShareButton>

			<LinkedinShareButton url={post.slug} title={post.title}>
				<LinkedinIcon size={32} round />
			</LinkedinShareButton>
		</div>
	);
};

export default ShareButtons;
