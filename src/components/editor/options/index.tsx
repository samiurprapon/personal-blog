import TagsSection from '~/components/editor/options/TagsSection';
import ImageSection from '~/components/editor/options/ImageSection';
import PublishSection from '~/components/editor/options/PublishSection';

const EditorOptions: React.FC = () => {
	return (
		<aside className="editor__sidebar">
			<PublishSection />
			<TagsSection />
			<ImageSection />
		</aside>
	);
};

export default EditorOptions;
