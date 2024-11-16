import { GitHubContributionsCalendar } from '~/components/GitHubCalendar';
import { GITHUB_USERNAME } from '~/configs/environment';

import Navigation from '~/components/Navigation';
import GithubProfile from '~/components/GithubProfile';

function MePage() {
	return (
		<>
			<Navigation />

			<main className="container">
				<GithubProfile />
				<GitHubContributionsCalendar username={GITHUB_USERNAME} />
				<br />
			</main>
		</>
	);
}

export default MePage;
