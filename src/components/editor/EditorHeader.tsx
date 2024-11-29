import React, { useEffect } from 'react';
import { Eye, Save, Send } from 'lucide-react';

import { toast } from 'react-hot-toast';

import { useEditorStore } from '~/store/editor';

const EditorHeader: React.FC = () => {
	const { state, togglePreviewMode, saveDraft, publish } = useEditorStore();

	const handleSaveDraft = async () => {
		try {
			await saveDraft();
			toast.success('Draft saved successfully');
		} catch {
			toast.error('Failed to save draft');
		}
	};

	const handlePublish = async () => {
		try {
			await publish();
			toast.success('Post published successfully');
		} catch {
			toast.error('Failed to publish post');
		}
	};

	const handleSaveShortcut = (event: KeyboardEvent) => {
		if ((event.ctrlKey || event.metaKey) && event.key === 's') {
			event.preventDefault();
			handleSaveDraft();
		}

		if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
			event.preventDefault();
			handleSaveDraft();
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleSaveShortcut);

		return () => {
			document.removeEventListener('keydown', handleSaveShortcut);
		};
	}, []);

	return (
		<header className="editor-header">
			<div className="editor-header__left">
				<h1 className="editor-header__title">
					{state.post.title || 'Untitled Post'}
				</h1>
				{state.lastSaved && (
					<span className="editor-header__saved">
						Last saved: {new Date(state.lastSaved).toLocaleTimeString()}
					</span>
				)}
			</div>
			<div className="editor-header__actions">
				<button
					className="btn btn--icon"
					onClick={togglePreviewMode}
					title="Toggle Preview"
				>
					<Eye />
				</button>
				<button
					className="btn btn--secondary"
					onClick={handleSaveDraft}
					disabled={!state.isDirty}
				>
					<Save /> Save Draft
				</button>
				<button className="btn btn--primary" onClick={handlePublish}>
					<Send /> Publish
				</button>
			</div>
		</header>
	);
};

export default EditorHeader;
