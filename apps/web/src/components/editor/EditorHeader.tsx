import type React from 'react';
import { useCallback, useEffect } from 'react';
import { Eye, Save, Send } from 'lucide-react';

import { toast } from 'react-hot-toast';

import { useEditorStore } from '~/store/editor';

const EditorHeader: React.FC = () => {
	const { state, togglePreviewMode, saveDraft, publish } = useEditorStore();

	const handleSaveDraft = useCallback(async () => {
		try {
			await saveDraft();
			toast.success('Draft saved successfully');
		} catch {
			toast.error('Failed to save draft');
		}
	}, [saveDraft]);

	const handlePublish = async () => {
		try {
			await publish();
			toast.success('Post published successfully');
		} catch {
			toast.error('Failed to publish post');
		}
	};

	const handleSaveShortcut = useCallback(
		(event: KeyboardEvent) => {
			if ((event.ctrlKey || event.metaKey) && event.key === 's') {
				event.preventDefault();
				handleSaveDraft();
			}

			if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
				event.preventDefault();
				handleSaveDraft();
			}
		},
		[handleSaveDraft],
	);

	useEffect(() => {
		document.addEventListener('keydown', handleSaveShortcut);

		return () => {
			document.removeEventListener('keydown', handleSaveShortcut);
		};
	}, [handleSaveShortcut]);

	return (
		<div className='editor-header-container'>
			<div className='editor-header'>
				<div className='editor-header__actions'>
					<button type='button' className='btn btn--icon' onClick={togglePreviewMode} title='Toggle Preview'>
						<Eye />
					</button>
					<button type='button' className='btn btn--secondary' onClick={handleSaveDraft} disabled={!state.isDirty}>
						<Save />
					</button>
					<button type='button' className='btn btn--primary' onClick={handlePublish}>
						<Send />
					</button>
				</div>
			</div>

			<div className='last-save'>
				{state.lastSaved && (
					<span className='editor-header__saved'>Last saved: {new Date(state.lastSaved).toLocaleTimeString()}</span>
				)}
			</div>
		</div>
	);
};

export default EditorHeader;
