'use client';

import Link from 'next/link';

export function Logo() {
	return (
		<Link
			className="text-textColor hover:text-primary text-[1.7rem] leading-normal no-underline transition-all"
			href="/"
		>
			<span className="tracking-widest">&lt;</span>
			<span className="font-agustina text-au px-2 font-bold">SamiurPrapon</span>
			<span className="tracking-widest">/&gt;</span>
		</Link>
	);
}
