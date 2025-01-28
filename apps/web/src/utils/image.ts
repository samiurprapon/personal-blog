import imageCompression from 'browser-image-compression';
import { toast } from 'react-hot-toast';

export const optimizeImage = async (file: File): Promise<Blob> => {
	const options = {
		maxSizeMB: 1,
		maxWidthOrHeight: 1920,
		useWebWorker: true,
	};

	try {
		return await imageCompression(file, options);
	} catch {
		toast.error('Failed to optimize image');
		return file;
	}
};
