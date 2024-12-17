import React from 'react';
import { useEditorStore } from '~/store/editor';

const TitleEditor: React.FC = () => {
	const { state, setTitle } = useEditorStore();

	return (
		<div className="title-editor">
			<input
				type="text"
				value={state.post.title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Enter post title..."
				className="title-editor__input"
				aria-label="Post title"
			/>
			<div className="title-editor__slug">
				{state.post.slug && (
					<span className="title-editor__slug-preview">
						Permalink: /blog/{state.post.slug}
					</span>
				)}
			</div>
		</div>
	);
};

export default TitleEditor;
