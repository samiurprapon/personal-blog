export const POST_STATUSES = ['draft', 'published', 'archived', 'deleted'] as const;

type postStatus = (typeof POST_STATUSES)[number];

export default postStatus;
