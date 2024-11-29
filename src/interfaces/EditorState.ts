import { Post } from './Post.interface';

export interface EditorState {
	post: Post;
	isDirty: boolean;
	lastSaved: string | null;
	isPreviewMode: boolean;
	theme: 'light' | 'dark';
}

export interface EditorStore {
	state: EditorState;
	setTitle: (title: string) => void;
	setContent: (content: string) => void;
	setFeaturedImage: (featuredImage: string) => void;
	setPublishedDate: (date: string) => void;
	setTags: (tags: string[]) => void;
	togglePreviewMode: () => void;
	saveDraft: () => Promise<void>;
	publish: () => Promise<void>;
	schedulePublication: (date: string) => Promise<void>;
}
