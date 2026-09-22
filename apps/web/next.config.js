/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "images.unsplash.com" },
			{ protocol: "https", hostname: "plus.unsplash.com" },
			{ protocol: "https", hostname: "m.media-amazon.com" },
            { protocol: "https", hostname: "m.media-amazon.com" },
            { protocol: "https", hostname: "images.dog.ceo" },
		],
	},
};

export default nextConfig;
