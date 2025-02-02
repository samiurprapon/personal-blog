export const ROLES = ['subscriber', 'user', 'owner'] as const;

type role = (typeof ROLES)[number];

export default role;
