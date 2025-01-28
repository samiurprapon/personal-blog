import { useState } from 'react';
import Select from 'react-select';

import { GITHUB_USERNAME, GITHUB_JOIN_YEAR } from '~/configs/environment';

import Navigation from '~/components/header/Navigation';
import GithubProfile from '~/components/github/GithubProfile';
import { GitHubContributionsCalendar } from '~/components/github/GitHubCalendar';
import { Year } from '~/interfaces/GithubAPI';

function MePage() {
	const [year, setYear] = useState<number | 'last'>('last');

	const currentYear = new Date().getFullYear();

	const years: Year[] = [
		'last',
		...Array.from({ length: currentYear - GITHUB_JOIN_YEAR + 1 }, (_, i) => currentYear - i),
	];
	return (
		<>
			<Navigation />

			<main className="container">
				<GithubProfile />

				<div className="row">
					<div className="col-xs-12">
						<div className="dropdown-container">
							<div className="dropdown-year">
								<Select
									value={year === 'last' ? { value: 'last', label: 'Last 12 months' } : { value: year, label: year }}
									onChange={(selected) =>
										selected && setYear(selected.value === 'last' ? 'last' : Number(selected.value))
									}
									options={years.map((y) => ({
										value: typeof y === 'string' ? y : y.toString(),
										label: y.toString(),
									}))}
									className="select-container"
									classNamePrefix="react-select"
								/>
							</div>
						</div>
					</div>

					<div className="col-md-3"></div>
					<div className="col-xs-12 col-md-9">
						<div className="github-calendar">
							<GitHubContributionsCalendar username={GITHUB_USERNAME} year={year} />
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export default MePage;
