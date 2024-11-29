import { useState } from 'react';

import { GITHUB_USERNAME, GITHUB_JOIN_YEAR } from '~/configs/environment';

import Navigation from '~/layouts/Navigation';
import GithubProfile from '~/components/github/GithubProfile';
import { GitHubContributionsCalendar } from '~/components/github/GitHubCalendar';

function MePage() {
	const [year, setYear] = useState<number | 'last'>('last');

	const currentYear = new Date().getFullYear();

	const years = Array.from(
		{ length: currentYear - GITHUB_JOIN_YEAR + 1 },
		(_, i) => currentYear - i,
	);

	return (
		<>
			<Navigation />

			<main className="container">
				<GithubProfile />

				<div className="row">
					<div className="col-xs-12">
						<div className="dropdown-container">
							<div className="dropdown-year">
								<select
									className="dropdown-year__select"
									value={year}
									onChange={(e) =>
										setYear(
											e.target.value === 'last'
												? 'last'
												: Number(e.target.value),
										)
									}
								>
									<option value="last">Last 12 months</option>
									{years.map((y) => (
										<option key={y} value={y}>
											{y}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>

					<div className="col-md-3"></div>
					<div className="col-xs-12 col-md-9">
						<div className="github-calendar">
							<GitHubContributionsCalendar
								username={GITHUB_USERNAME}
								year={year}
							/>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export default MePage;
