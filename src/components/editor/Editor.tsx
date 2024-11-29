import React from 'react';
import { Toaster } from 'react-hot-toast';

import EditorHeader from '~/components/editor/EditorHeader';
import EditorMain from '~/components/editor/EditorMain';
import EditorOptions from '~/components/editor/options';

const Editor: React.FC = () => {
	return (
		<div className="editor">
			<Toaster position="top-right" />
			<EditorHeader />
			<div className="editor__container">
				<EditorMain />
				<EditorOptions />
			</div>
		</div>
	);
};

export default Editor;
