const tags = [
	'🐋 Docker',
	'🔥 Cloudflare',
	'☕ Java',
	'git',
	'🗑️ trash',
	'🐘 postgres',
	'💔 ex',
	'🔑 jwt',
	'📂 monorepo',
	'redis',
	'🔐 jwe',
	'nestjs',
	'🎓 nsu',
	'🏡 rangpur',
	'arch-btw',
	'🐧 linux',
	'BdOSN',
	'🌀 aether',
	'📝 vs-code',
];

const shuffleTags = (array: string[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]]; // Swap elements
	}
	return array;
};

export default shuffleTags(tags);
