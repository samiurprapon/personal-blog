import React from 'react';
import Select from 'react-select';
import tags from '~/mocks/tags';

import { useEditorStore } from '~/store/editor';

const TagsSection: React.FC = () => {
	const { state, setTags } = useEditorStore();

	return (
		<section className="sidebar-section">
			<h3 className="sidebar-section__title">Categories & Tags</h3>
			<div className="sidebar-section__content">
				<Select
					isMulti
					value={state.post.tags.map((tag) => ({ value: tag, label: tag }))}
					onChange={(selected) =>
						setTags(selected.map((option) => option.value))
					}
					options={tags.map((tag) => ({ value: tag, label: tag }))}
					placeholder="Add tags..."
					className="select-container"
					classNamePrefix="select"
					// isCreatable
				/>
			</div>
		</section>
	);
};

export default TagsSection;
