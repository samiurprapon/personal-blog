import { GitHubContributionsCalendar } from '~/components/GitHubCalendar';
import { GITHUB_USERNAME } from '~/configs/environment';

function MePage() {
	return (
		<main className="container">
			<GitHubContributionsCalendar username={GITHUB_USERNAME} />
		</main>
	);
}

export default MePage;
