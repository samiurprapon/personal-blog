import { JSX } from 'react';
import { Command, Blend, KeyRound } from 'lucide-react';

interface IMenuItem {
	name: string;
	path: string;
	icon?: JSX.Element;
}

export const MENU_ITEMS: IMenuItem[] = [
	{ name: 'Latest', path: '/' },
	{ name: 'Projects', path: '/projects' },
	{ name: 'Use?', path: '/uses' },
	{ name: 'Bucket', path: '/bucket' },
	{ name: 'About', path: '/me' },
];

export const TOOLS_ITEMS = [
	{
		name: 'Markdown Editor',
		path: '/tools/markdown',
		icon: <Command className="icon" />,
	},
	{
		name: 'Color Generator',
		path: '/tools/color-generator',
		icon: <Blend className="icon" />,
	},
	{
		name: 'Password Generator',
		path: '/tools/password-generator',
		icon: <KeyRound className="icon" />,
	},
];
