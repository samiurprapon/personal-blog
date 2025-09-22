import type React from 'react';
import { useDropzone } from 'react-dropzone';

import { useEditorStore } from '~/store/editor';
import { optimizeImage } from '~/utils/image';

const ImageSection: React.FC = () => {
	const { state, setFeaturedImage } = useEditorStore();

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
		<section className='sidebar-section'>
			<h3 className='sidebar-section__title'>Featured Image</h3>
			<div className='sidebar-section__content'>
				<div {...getRootProps()} className='image-dropzone'>
					<input {...getInputProps()} />
					{state.post.featuredImage ? (
						<img src={state.post.featuredImage} alt='Featured' className='image-preview' />
					) : (
						<p>Drag & drop an image here, or click to select</p>
					)}
				</div>
			</div>
		</section>
	);
};

export default ImageSection;
