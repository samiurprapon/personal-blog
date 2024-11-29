import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { EditorStore, EditorState } from '~/interfaces/EditorState';

import { calculateReadingTime } from '~/utils/readingTime';
import { generateSlug } from '~/utils/slugify';

const initialState: EditorState = {
	post: {
		id: '',
		title: '',
		slug: '',
		content: '',
		excerpt: '',
		featuredImage: '',
		publishedDate: new Date().toISOString(),
		status: 'draft',
		author: {
			id: '1',
			name: 'John Doe',
			avatar: 'https://via.placeholder.com/100',
			bio: 'Writer',
		},
		tags: [],
		readTime: '',
	},
	isDirty: false,
	lastSaved: null,
	isPreviewMode: false,
	theme: 'light',
};

export const useEditorStore = create<EditorStore>()(
	immer((set) => ({
		state: initialState,

		setTitle: (title: string) =>
			set((state) => {
				state.state.post.title = title;
				state.state.post.slug = generateSlug(title);
				state.state.isDirty = true;
			}),

		setContent: (content: string) =>
			set((state) => {
				state.state.post.content = content;
				state.state.post.readTime = calculateReadingTime(content);
				state.state.isDirty = true;
			}),

		setFeaturedImage: (featuredImage: string) =>
			set((state) => {
				state.state.post.featuredImage = featuredImage;
				state.state.isDirty = true;
			}),

		setPublishedDate: (date: string) =>
			set((state) => {
				state.state.post.publishedDate = date;
				state.state.isDirty = true;
			}),

		setTags: (tags: string[]) =>
			set((state) => {
				state.state.post.tags = tags;
				state.state.isDirty = true;
			}),

		togglePreviewMode: () =>
			set((state) => {
				state.state.isPreviewMode = !state.state.isPreviewMode;
			}),

		saveDraft: async () => {
			// const state = get().state;

			// Implementation for saving draft
			set((state) => {
				state.state.lastSaved = new Date().toISOString();
				state.state.isDirty = false;
			});
		},

		publish: async () => {
			// const state = get().state;

			// Implementation for publishing
			set((state) => {
				state.state.post.status = 'published';
				state.state.lastSaved = new Date().toISOString();
				state.state.isDirty = false;
			});
		},

		schedulePublication: async (date: string) => {
			// const state = get().state;

			// Implementation for scheduling
			set((state) => {
				state.state.post.status = 'scheduled';
				state.state.post.publishedDate = date;
				state.state.lastSaved = new Date().toISOString();
				state.state.isDirty = false;
			});
		},
	})),
);
