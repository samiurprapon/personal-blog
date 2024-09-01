import { ReactNode, ReactElement } from 'react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type HyperLinkProps = {
	children: ReactNode;
	href: string;
};

export const HyperLink = ({ children, href }: HyperLinkProps) => (
	<a
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		className="blog-post-anchor"
	>
		{children}
		<style>
			{`
				a {
					color: #484848;
					font-weight: 400;
				}
			`}
		</style>
	</a>
);

export function CodeBlock({ children }: { children: ReactElement }) {
	return (
		<SyntaxHighlighter language="javascript" style={docco}>
			{children.props.children}
		</SyntaxHighlighter>
	);
}
