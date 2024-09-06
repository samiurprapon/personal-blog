import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		{
			...mdx(),
			enforce: 'pre',
		},
	],

	resolve: {
		alias: {
			'~': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
