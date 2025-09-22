import type React from 'react';

import TitleEditor from '~/components/editor/TitleEditor';
import ContentEditor from '~/components/editor/ContentEditor';

const EditorMain: React.FC = () => {
	return (
		<main className='editor__main'>
			<TitleEditor />
			<ContentEditor />
		</main>
	);
};

export default EditorMain;
