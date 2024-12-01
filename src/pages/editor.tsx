import Navigation from '~/layouts/Navigation';
import Editor from '~/components/editor/Editor';

function EditorPage() {
	return (
		<>
			<Navigation />
			<main>
				<Editor />
			</main>
		</>
	);
}

export default EditorPage;
