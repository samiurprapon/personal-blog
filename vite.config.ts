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
			outDir: 'dist',
			emptyOutDir: true,
			chunkSizeWarningLimit: 1024,
			rollupOptions: {
				output: {
					// Improved manual chunking strategy
					manualChunks: (id) => {
						// Split node_modules into separate chunks
						if (id.includes('node_modules')) {
							// Core libraries get their own chunks
							if (
								id.includes('react') ||
								id.includes('react-dom') ||
								id.includes('react-redux') ||
								id.includes('@reduxjs/toolkit') ||
								id.includes('redux')
							) {
								return 'react';
							}

							if (
								id.includes('lucide-react') ||
								id.includes('cmdk') ||
								id.includes('clsx')
							) {
								return 'ui-helpers';
							}

							if (
								id.includes('browser-image-compression') ||
								id.includes('react-dropzone')
							) {
								return 'file-utils';
							}

							// Markdown and editors
							if (
								id.includes('markdown') ||
								id.includes('markdown-to-jsx') ||
								id.includes('@uiw/react-md-editor')
							) {
								return 'markdown';
							}

							if (
								id.includes('asn1.js') ||
								id.includes('hash') ||
								id.includes('parse-asn1') ||
								id.includes('des') ||
								id.includes('sha') ||
								id.includes('browserify-des') ||
								id.includes('browserify-*') ||
								id.includes('browserify-aes')
							) {
								return 'crypto';
							}

							// Date utilities
							if (
								id.includes('date-fns') ||
								id.includes('react-contribution-calendar') ||
								id.includes('react-dropzone')
							) {
								return 'date-utils';
							}

							if (id.includes('refractor')) {
								return 'syntax-highlighting';
							}

							// Default fallback for other node_modules
							return 'vendor';
						}
					},
					// Chunk size and naming
					chunkFileNames: 'assets/[name]-[hash].js',
					entryFileNames: 'assets/[name]-[hash].js',
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
