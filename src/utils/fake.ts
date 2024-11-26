import { Post } from '~/interfaces/Post.interface';

const fakePosts: Post[] = [
	{
		title: 'Getting Started with Docker 🐋',
		excerpt:
			'Learn the basics of containerization with Docker and how it simplifies application deployment.',
		tags: ['🐋 Docker', '🔥 Cloudflare', '🐧 linux'],
		slug: 'getting-started-with-docker',
		readTime: '5 min read',
		coverImage: 'https://random.danielpetrica.com/api/random?format=regular&1',
	},
	{
		title: 'Mastering Redis for High Performance Caching',
		excerpt:
			'An in-depth guide to leveraging Redis for building scalable, high-performance applications.',
		tags: ['redis', '🐘 postgres'],
		slug: 'mastering-redis-caching',
		readTime: '7 min read',
		coverImage: 'https://random.danielpetrica.com/api/random?format=regular&2',
	},
	{
		title: 'Monorepo Management with Nx 📂',
		excerpt:
			'Explore the benefits and strategies for managing your codebase using a monorepo structure.',
		tags: ['📂 monorepo', 'nestjs'],
		slug: 'monorepo-management-nx',
		readTime: '6 min read',
		coverImage: 'https://random.danielpetrica.com/api/random?format=regular&3',
	},
	{
		title: 'Linux Survival Guide for Beginners 🐧',
		excerpt:
			'A beginner-friendly guide to navigating and using Linux effectively for everyday tasks.',
		tags: ['🐧 linux', 'arch-btw'],
		slug: 'linux-survival-guide',
		readTime: '8 min read',
		coverImage: 'https://random.danielpetrica.com/api/random?format=regular&4',
	},
	{
		title: 'Exploring Aether: The Learning Management System 🌀',
		excerpt:
			'Dive into the features and innovations behind Aether, a modern LMS built for educators and learners.',
		tags: ['🌀 aether', '🎓 nsu'],
		slug: 'exploring-aether-lms',
		readTime: '9 min read',
		coverImage: 'https://random.danielpetrica.com/api/random?format=regular&5',
	},
	{
		title: 'Secure APIs with JWE and JWT 🔐',
		excerpt:
			'Learn how to secure your APIs using JSON Web Encryption (JWE) and JSON Web Tokens (JWT).',
		tags: ['🔑 jwt', '🔐 jwe', 'nestjs'],
		slug: 'secure-apis-jwe-jwt',
		readTime: '4 min read',
		coverImage: 'https://random.danielpetrica.com/api/random?format=regular&6',
	},
	{
		title: 'Writing Clean Code in Java ☕',
		excerpt:
			'Best practices and techniques for writing maintainable and efficient Java code.',
		tags: ['☕ Java', '📝 vs-code'],
		slug: 'clean-code-java',
		readTime: '6 min read',
		coverImage: 'https://random.danielpetrica.com/api/random?format=regular&8',
	},
	{
		title: 'Building Secure APIs with JSON Web Encryption (🔐 JWE)',
		excerpt:
			'Learn how to secure your APIs using JSON Web Encryption for encrypted payloads.',
		tags: ['🔐 jwe', 'nestjs', '🔑 jwt'],
		slug: 'building-secure-apis-jwe',
		readTime: '8 min read',
		coverImage: 'https://random.danielpetrica.com/api/random?format=regular&7',
	},
	{
		title: 'Arch Linux: BTW, I Use It 🐧',
		excerpt:
			'A guide to installing and customizing Arch Linux for your workflow.',
		tags: ['arch-btw', '🐧 linux'],
		slug: 'arch-linux-btw',
		readTime: '6 min read',
		coverImage: 'https://random.danielpetrica.com/api/random?format=regular&9',
	},
	{
		title: 'Journey Through Rangpur 🏡',
		excerpt:
			'Exploring the vibrant culture, history, and tech potential of Rangpur.',
		tags: ['🏡 rangpur'],
		slug: 'journey-through-rangpur',
		readTime: '4 min read',
		coverImage: 'https://random.danielpetrica.com/api/random?format=regular&10',
	},
	{
		title: 'Supercharging Development with Aether 🌀',
		excerpt:
			'How the Aether LMS can transform e-learning and simplify workflows for educators.',
		tags: ['🌀 aether', 'nestjs', '🐘 postgres'],
		slug: 'aether-supercharging-development',
		readTime: '9 min read',
		coverImage: 'https://random.danielpetrica.com/api/random?format=regular&11',
	},
	{
		title: 'Cloudflare Worker Basics 🔥',
		excerpt:
			'Get started with Cloudflare Workers to build serverless applications effortlessly.',
		tags: ['🔥 Cloudflare', '🐋 Docker', '🔑 jwt'],
		slug: 'cloudflare-worker-basics',
		readTime: '5 min read',
		coverImage: 'https://random.danielpetrica.com/api/random?format=regular&12',
	},
	{
		title: 'When Your Code is Trash 🗑️',
		excerpt:
			'A lighthearted take on refactoring bad code and learning from mistakes.',
		tags: ['🗑️ trash', 'git'],
		slug: 'refactoring-trash-code',
		readTime: '4 min read',
		coverImage: 'https://random.danielpetrica.com/api/random?format=regular&14',
	},
	{
		title: 'The Ex Factor in Code Reviews 💔',
		excerpt:
			'How to manage emotional detachment from code during pull request reviews.',
		tags: ['💔 ex'],
		slug: 'code-reviews-emotions',
		readTime: '7 min read',
		coverImage: 'https://random.danielpetrica.com/api/random?format=regular&15',
	},
	{
		title: 'Postgres Beyond Basics 🐘',
		excerpt:
			'A deeper dive into advanced features of PostgreSQL for modern applications.',
		tags: ['🐘 postgres'],
		slug: 'postgres-beyond-basics',
		readTime: '10 min read',
		coverImage: 'https://random.danielpetrica.com/api/random?format=regular&16',
	},
	{
		title: 'VS Code Productivity Hacks 📝',
		excerpt:
			'Discover tips and extensions to maximize your productivity in Visual Studio Code.',
		tags: ['📝 vs-code', 'git'],
		slug: 'vs-code-productivity-hacks',
		readTime: '5 min read',
		coverImage: 'https://random.danielpetrica.com/api/random?format=regular&17',
	},
];

const sufflePosts = (array: Post[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]]; // Swap elements
	}
	return array;
};

export default sufflePosts(fakePosts);
