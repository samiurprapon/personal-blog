import atob from 'atob';

const config = {
	// Github Converted Token from -> https://www.utilities-online.info/base64
	githubConvertedToken:
		atob(import.meta.env.VITE_REACT_APP_GITHUB_TOKEN) || 'token',

	// Github UserName
	githubUserName: 'samiurprapon',

	// Github Repo Name
	githubRepo: 'blog',

	// Personal Blog Title
	title: "Samiur Prapon's Blog",

	// Personal Blog Subtitle
	subtitle: 'Software Enthusiast',
};

export default config;
