'use client';

import { Banner } from '@/components/ui/banner';
import { Button } from '@/components/ui/button';
import { Eclipse, X, Github } from 'lucide-react';
import { useState } from 'react';

function DevelopmentBanner() {
	const [isVisible, setIsVisible] = useState(true);

	if (!isVisible) return null;

	return (
		<Banner variant="muted" className="dark text-foreground md:py-2">
			<div className="flex w-full gap-2 md:items-center">
				<div className="flex grow gap-3 md:items-center">
					<Eclipse className="shrink-0 opacity-60 max-md:mt-0.5" size={16} strokeWidth={2} aria-hidden="true" />
					<div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
						<p className="text-sm">
							Blog is in under developement. Current version: <strong>v0.2.1</strong>
						</p>
						<div className="flex gap-2 max-md:flex-wrap">
							<Button size="sm" className="text-sm" variant={'outline'}>
								<Github size={16} strokeWidth={2} className="shrink-0" aria-hidden="true" />
								Source
							</Button>
						</div>
					</div>
				</div>
				<Button
					variant="ghost"
					className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
					onClick={() => setIsVisible(false)}
					aria-label="Close banner"
				>
					<X
						size={16}
						strokeWidth={2}
						className="opacity-60 transition-opacity group-hover:opacity-100"
						aria-hidden="true"
					/>
				</Button>
			</div>
		</Banner>
	);
}

export { DevelopmentBanner };
