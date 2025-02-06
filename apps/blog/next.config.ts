import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	experimental: {
		forceSwcTransforms: true,
	},
	output: 'export',
	distDir: '../../dist/apps/blog',
};

export default nextConfig;
