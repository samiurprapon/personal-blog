'use client';

import { Twitter, Github } from 'lucide-react';

export default function Footer() {
	return (
		<footer className="border-t border-gray-200 dark:border-slate-800">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<div className="py-3 md:flex md:items-center md:justify-between">
					<ul className="mb-4 -ml-2 flex justify-center md:order-1 md:mb-0 md:ml-4">
						<li>
							<a
								className="inline-flex items-center rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
								href="https://twitter.com/samiurprapon"
								target="_blank"
								aria-label="Twitter"
							>
								<Twitter size={24} className="h-5 w-5" />
							</a>
						</li>
						<li>
							<a
								className="inline-flex items-center rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
								href="https://github.com/samiurprapon"
								target="_blank"
								aria-label="GitHub"
							>
								<Github size={24} className="h-5 w-5" />
							</a>
						</li>
					</ul>
					<div className="mr-4 hidden text-xs text-gray-700 md:inline dark:text-slate-400">
						{/* Format With Bionic Reading: https://reader.bionic-reading.com/ */}
						<q>
							<b>T</b>he <b>peo</b>ple <b>w</b>ho <b>a</b>re <b>cra</b>zy
							<b> eno</b>ugh <b>t</b>o <b>thi</b>nk <b>th</b>ey <b>c</b>an <b>cha</b>nge <b>t</b>he <b>wor</b>ld
							<b> a</b>re <b>t</b>he <b>on</b>es <b>w</b>ho <b>d</b>o.
						</q>
					</div>
				</div>
			</div>
		</footer>
	);
}
