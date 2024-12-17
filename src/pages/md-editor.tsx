import Navigation from '~/components/header/Navigation';
import ContentEditor from '~/components/editor/ContentEditor';
import { useBreakpoint } from '~/hooks/useBreakpoint';

function MarkDownEditorPage() {
	const { isMobile, isTablet } = useBreakpoint();

	return (
		<>
			<Navigation />
			<main>
				<div className="container-fluid">
					<h2 className="mb-xs-4 mb-md-2">
						{'Markdown Editor '}
						<span className="small-text">(GitHub compatible)</span>
					</h2>

					<ContentEditor
						extra={true}
						preview={isMobile || isTablet ? 'edit' : 'live'}
					/>
				</div>
			</main>
		</>
	);
}

export default MarkDownEditorPage;
