import imageCompression from 'browser-image-compression';

export const optimizeImage = async (file: File): Promise<Blob> => {
	const options = {
		maxSizeMB: 1,
		maxWidthOrHeight: 1920,
		useWebWorker: true,
	};

	try {
		return await imageCompression(file, options);
	} catch (error) {
		console.error('Error optimizing image:', error);
		return file;
	}
};
