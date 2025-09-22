import type React from 'react';
import MDEditor, { commands, type PreviewType } from '@uiw/react-md-editor';

import { useEditorStore } from '~/store/editor';
import { useTheme } from '~/hooks/useTheme';

const ContentEditor: React.FC<{
	preview?: PreviewType;
	extra?: boolean;
}> = ({ preview, extra }) => {
	const { state, setContent } = useEditorStore();
	const { theme } = useTheme();

	return (
		<div className='content-editor' data-color-mode={theme}>
			<MDEditor
				value={state.post.content}
				onChange={(value) => setContent(value || '')}
				preview={preview ? preview : state.isPreviewMode ? 'preview' : 'live'}
				previewOptions={{
					style: {
						backgroundColor: 'var(--color-background)',
					},
				}}
				visibleDragbar={false}
				hideToolbar={false}
				enableScroll={true}
				textareaProps={{
					placeholder: 'Write your post content here...',
				}}
				extraCommands={extra ? undefined : [commands.fullscreen]}
			/>
		</div>
	);
};

export default ContentEditor;
