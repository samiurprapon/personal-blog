'use client';
import { Button } from '@/components/ui/button';
import { QrCode } from 'lucide-react';

function LoginButton() {
	return (
		<div className="divide-primary-foreground/30 inline-flex -space-x-px divide-x rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse">
			<Button
				className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
				size="icon"
				aria-label="QR code"
			>
				<QrCode size={16} strokeWidth={2} aria-hidden="true" />
			</Button>
			<Button className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10">
				Sign in
			</Button>
		</div>
	);
}

export { LoginButton };
