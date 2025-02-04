import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	experimental: {
		forceSwcTransforms: true,
	},
};

export default nextConfig;
