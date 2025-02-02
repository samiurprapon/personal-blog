export const LANGUAGES = ['english', 'bangla'] as const;

type language = (typeof LANGUAGES)[number];

export default language;
