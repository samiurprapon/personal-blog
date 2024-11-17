import { useState } from 'react';

import { GITHUB_JOIN_YEAR } from '~/configs/environment';

import Navigation from '~/components/Navigation';
import GithubProfile from '~/components/GithubProfile';

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
						<div className="dropdown-year">
							<select
								className="dropdown-year__select"
								value={year}
								onChange={(e) =>
									setYear(
										e.target.value === 'last' ? 'last' : Number(e.target.value),
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
			</main>
		</>
	);
}

export default MePage;
