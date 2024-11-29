// import { Helmet } from 'react-helmet-async';

import Navigation from '~/layouts/Navigation';
import Editor from '~/components/editor/Editor';

function EditorPage() {
	return (
		<>
			<Navigation />
			<main>
				{/* <Helmet>
					<title>Post Editor - Modern React Blog</title>
					<meta name="description" content="Create and edit blog posts" />
				</Helmet> */}
				<Editor />
			</main>
		</>
	);
}

export default EditorPage;
