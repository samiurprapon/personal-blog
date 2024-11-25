import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

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
			nodePolyfills({
				include: ['crypto', 'stream', 'util'],
				exclude: [
					'_stream_duplex',
					'_stream_passthrough',
					'_stream_readable',
					'_stream_transform',
					'_stream_writable',
					'assert',
					'buffer',
					'child_process',
					'cluster',
					'console',
					'constants',
					'dgram',
					'dns',
					'domain',
					'events',
					'fs',
					'http',
					'http2',
					'https',
					'module',
					'net',
					'os',
					'path',
					'process',
					'punycode',
					'querystring',
					'readline',
					'repl',
					'string_decoder',
					'sys',
					'timers',
					'timers/promises',
					'tls',
					'tty',
					'url',
					'vm',
					'zlib',
				],
			}),
		],
		resolve: {
			alias: {
				'~': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
		build: {
			chunkSizeWarningLimit: 1024,
			rollupOptions: {
				output: {
					manualChunks: {
						react: ['react', 'react-dom'],
						include: ['crypto'],
					},
				},
			},
		},
		optimizeDeps: {
			include: ['crypto'],
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
