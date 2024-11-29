import React from 'react';
import Select from 'react-select';
import { useDropzone } from 'react-dropzone';

import { useEditorStore } from '~/store/editor';
import { optimizeImage } from '~/utils/image';
import { Category } from '~/types/status.type';

const MetadataEditor: React.FC = () => {
	const {
		state,
		setSeoTitle,
		setSeoDescription,
		setFeaturedImage,
		setCategories,
		setTags,
		setPublishedDate,
	} = useEditorStore();

	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
		},
		maxSize: 5242880,
		onDrop: async (acceptedFiles) => {
			const optimizedImage = await optimizeImage(acceptedFiles[0]);
			setFeaturedImage(URL.createObjectURL(optimizedImage));
		},
	});

	return (
		<div className="metadata-editor">
			<section className="metadata-editor__section">
				<h3>SEO Settings</h3>
				<input
					type="text"
					value={state.post.seoTitle}
					onChange={(e) => setSeoTitle(e.target.value)}
					placeholder="SEO Title"
					className="metadata-editor__input"
				/>
				<textarea
					value={state.post.seoDescription}
					onChange={(e) => setSeoDescription(e.target.value)}
					placeholder="SEO Description"
					className="metadata-editor__textarea"
				/>
			</section>

			<section className="metadata-editor__section">
				<h3>Featured Image</h3>
				<div {...getRootProps()} className="metadata-editor__dropzone">
					<input {...getInputProps()} />
					{state.post.featuredImage ? (
						<img
							src={state.post.featuredImage}
							alt="Featured"
							className="metadata-editor__preview"
						/>
					) : (
						<p>Drag & drop an image here, or click to select</p>
					)}
				</div>
			</section>

			<section className="metadata-editor__section">
				<h3>Categories & Tags</h3>
				<Select
					isMulti
					value={state.post.categories}
					onChange={(selected) =>
						setCategories(selected.map((option) => option as Category) || [])
					}
					options={[]} // Add your category options here
					placeholder="Select categories..."
				/>
				<Select
					isMulti
					value={state.post.tags.map((tag) => ({ value: tag, label: tag }))}
					onChange={(selected) =>
						setTags(selected.map((option) => option.value))
					}
					options={[]} // Add your tag options here
					placeholder="Add tags..."
				/>
			</section>

			<section className="metadata-editor__section">
				<h3>Publication Settings</h3>
				<input
					type="datetime-local"
					value={state.post.publishedDate.slice(0, 16)}
					onChange={(e) =>
						setPublishedDate(new Date(e.target.value).toISOString())
					}
					className="metadata-editor__input"
				/>
			</section>
		</div>
	);
};

export default MetadataEditor;
