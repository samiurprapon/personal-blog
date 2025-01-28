import { Loader } from 'lucide-react';
import Markdown from 'markdown-to-jsx';

import { GITHUB_PROFILE_URL, GITHUB_USERNAME } from '~/configs/environment';

import { useGetDefaultReadmeQuery } from '~/store/apis/github';

export function GithubProfile() {
	const { isLoading, data, error } = useGetDefaultReadmeQuery();

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return <div>Error: {(error as Error).message}</div>;
	}

	if (!data) {
		return <div>No data found</div>;
	}

	return (
		<div className="row github">
			<div className="col-xs-12 col-md-3 mt-md-2 github__sidebar">
				<div className="github__sidebar-profile">
					<img className="github__rounded-circle" src={GITHUB_PROFILE_URL} alt={GITHUB_USERNAME} />
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
				<div className="github__body-border mb-md-2">
					<div className="github__readme-wrapper">
						<div className="breadcrumb">{GITHUB_USERNAME} / README.md</div>
						<Markdown options={{ wrapper: 'article' }}>{data}</Markdown>
					</div>
				</div>
			</div>
		</div>
	);
}

export default GithubProfile;
