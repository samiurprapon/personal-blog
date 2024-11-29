import React from 'react';
import MDEditor, { commands } from '@uiw/react-md-editor';

import { useEditorStore } from '~/store/editor';
import { useTheme } from '~/hooks/useTheme';

const ContentEditor: React.FC = () => {
	const { state, setContent } = useEditorStore();
	const { theme } = useTheme();

	return (
		<div className="content-editor" data-color-mode={theme}>
			<MDEditor
				value={state.post.content}
				onChange={(value) => setContent(value || '')}
				preview={state.isPreviewMode ? 'preview' : 'live'}
				previewOptions={{
					style: {
						backgroundColor: 'var(--color-background)',
					},
				}}
				height={500}
				visibleDragbar={false}
				hideToolbar={false}
				enableScroll={true}
				textareaProps={{
					placeholder: 'Write your post content here...',
				}}
				extraCommands={[commands.fullscreen]}
			/>
		</div>
	);
};

export default ContentEditor;
