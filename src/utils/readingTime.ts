export const calculateReadingTime = (content: string): string => {
	const wordsPerMinute = 200; // Average case.

	const wordCount = content.trim().split(/\s+/).length;

	const minutes = Math.ceil(wordCount / wordsPerMinute);

	return `${minutes} min read`;
};
