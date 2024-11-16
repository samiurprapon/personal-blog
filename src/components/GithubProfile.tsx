import Markdown from 'markdown-to-jsx';
import { Loader } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

export function GithubProfile() {
	const [data, setData] = useState<string | null>(null);

	const fetchData = useCallback(() => {
		fetchDefaultReadme().then(setData);
	}, []);

	useEffect(fetchData, [fetchData]);

	if (!data) {
		return <Loader />;
	}

	return (
		<div className="row github">
			<div className="col-xs-12 col-md-3 mt-md-2 github__sidebar">
				<div className="github__sidebar-profile">
					<img
						className="github__rounded-circle"
						src="https://avatars.githubusercontent.com/u/25266703?v=4"
						alt="samiurprapon"
					/>
				</div>
				<div className="github__sidebar-body">
					<h1 className="github__title">Samiur Prapon</h1>
					<h3 className="github__sub-title mb-xs-3">
						samiurprapon · <span>he/him</span>
					</h3>

					<div className="github__bio">♦️ World is Diamond Shaped.</div>
				</div>
			</div>

			<div className="col-xs-12 col-md-9 mt-md-2">
				<div className="row">
					<div className="col-xs-12">
						<div className="github__body-border  mb-md-2">
							<div className="github__readme-wrapper">
								<div className="breadcrumb">samiurprapon / README.md</div>
								<Markdown options={{ wrapper: 'article' }}>
									{data || ''}
								</Markdown>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

async function fetchDefaultReadme() {
	const readmeURL = `https://raw.githubusercontent.com/samiurprapon/samiurprapon/refs/heads/master/README.md`;

	const response = await fetch(readmeURL);

	if (!response.ok) {
		throw new Error('Failed to fetch readme');
	}

	return response.text();
}

export default GithubProfile;
