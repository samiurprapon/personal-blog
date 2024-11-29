import React from 'react';
import MDEditor from '@uiw/react-md-editor';

import { useEditorStore } from '~/store/editor';

const ContentEditor: React.FC = () => {
	const { state, setContent } = useEditorStore();

	return (
		<div className="content-editor" data-color-mode={state.theme}>
			<MDEditor
				value={state.post.content}
				onChange={(value) => setContent(value || '')}
				preview={state.isPreviewMode ? 'preview' : 'live'}
				height={500}
				visibleDragbar={false}
				hideToolbar={false}
				enableScroll={true}
				textareaProps={{
					placeholder: 'Write your post content here...',
				}}
			/>
		</div>
	);
};

export default ContentEditor;
