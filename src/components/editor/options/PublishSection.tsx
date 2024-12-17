import React from 'react';

import { useEditorStore } from '~/store/editor';

const PublishSection: React.FC = () => {
	const { state, setPublishedDate } = useEditorStore();

	return (
		<section className="sidebar-section">
			<h3 className="sidebar-section__title">Publication Settings</h3>
			<div className="sidebar-section__content">
				<input
					type="datetime-local"
					className="form-input"
					value={state.post.publishedDate.slice(0, 16)}
					onChange={(e) =>
						setPublishedDate(new Date(e.target.value).toISOString())
					}
				/>
			</div>
		</section>
	);
};

export default PublishSection;
