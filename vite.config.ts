import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';

const REQUIRED_ENV_VARS = [
	'VITE_GITHUB_API',
	'VITE_GITHUB_USERNAME',
	'VITE_GITHUB_JOIN_YEAR',
];

// Load environment variables based on the current mode
function loadEnv({ mode }: { mode?: string }) {
	if (mode) {
		dotenv.config();
	}
}

// Function to validate environment variables
function validateEnvVars() {
	const missingVars = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

	if (missingVars.length > 0) {
		throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
	}
}

export default defineConfig(({ mode }) => {
	// Load and validate environment variables for the current mode
	loadEnv({ mode });
	validateEnvVars();

	return {
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
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
				},
			},
		},
	};
});
