import { postStatus } from '~/types/status.type';
import { Author } from './Author';

export interface Post {
	id: string;
	title: string;
	excerpt: string;
	tags: string[];
	slug: string;
	content: string;
	readTime: string;
	featuredImage: string;
	publishedDate: string;
	status: postStatus;
	author: Author;
}
