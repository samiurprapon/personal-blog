export const AUDIENCES = ['public', 'private', 'subscriber', 'proof-reader'] as const;

type audience = (typeof AUDIENCES)[number];

export default audience;
