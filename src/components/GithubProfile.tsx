import { useCallback, useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import Markdown from 'markdown-to-jsx';

import { GITHUB_USERNAME } from '~/configs/environment';
import { fetchDefaultReadme } from '~/utils/github-api';

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
						alt={GITHUB_USERNAME}
					/>
				</div>
				<div className="github__sidebar-body">
					<h1 className="github__title">Samiur Prapon</h1>
					<h3 className="github__sub-title mb-xs-3">
						{GITHUB_USERNAME} · <span>he/him</span>
					</h3>

					<div className="github__bio">♦️ World is Diamond Shaped.</div>
				</div>
			</div>

			<div className="col-xs-12 col-md-9">
				<div className="row">
					<div className="col-xs-12">
						<div className="github__body-border mb-md-2">
							<div className="github__readme-wrapper">
								<div className="breadcrumb">{GITHUB_USERNAME} / README.md</div>
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

export default GithubProfile;
