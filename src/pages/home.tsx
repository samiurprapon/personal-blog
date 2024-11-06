import Header from '~/sections/header/Header';
import { GitHubContributionsCalendar } from '~/components/GitHubCalendar';
import { GITHUB_USERNAME } from '~/configs/environment';

function HomePage() {
	return (
		<main className="container">
			<Header />
			<br />
			<GitHubContributionsCalendar username={GITHUB_USERNAME} />
		</main>
	);
}

export default HomePage;
