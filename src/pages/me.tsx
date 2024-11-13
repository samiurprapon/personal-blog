import { GitHubContributionsCalendar } from '~/components/GitHubCalendar';
import { GITHUB_USERNAME } from '~/configs/environment';

import Navigation from '~/components/Navigation';

function MePage() {
	return (
		<>
			<Navigation />

			<main className="container">
				<GitHubContributionsCalendar username={GITHUB_USERNAME} />
			</main>
		</>
	);
}

export default MePage;
