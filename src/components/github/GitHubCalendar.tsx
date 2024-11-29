import { useCallback, useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import { ContributionCalendar } from 'react-contribution-calendar';

import { CalendarProps } from '~/interfaces/ContributionsCalendarProps';
import { fetchCalendarData } from '~/utils/github-api';
import { ApiResponse } from '~/interfaces/GithubAPI';

export function GitHubContributionsCalendar({ username, year }: CalendarProps) {
	const [data, setData] = useState<ApiResponse | null>(null);

	const fetchData = useCallback(() => {
		fetchCalendarData(username, year).then((data) => {
			setData(data);
		});
	}, [username, year]);

	useEffect(fetchData, [fetchData]);

	if (!data) {
		return <Loader />;
	}

	return (
		<div className="github__body-border">
			<div className="col-xs-12">
				<p className="github-contribution__text">
					<span className="primary-text">
						{data.total[year] || data.total['lastYear']}
					</span>
					<span> contributions in </span>
					<span className="secondary-text">
						{year === 'last' ? 'last 12 months' : year}
					</span>
				</p>
			</div>
			<div className="col-xs-12 github-contribution">
				<ContributionCalendar
					theme={'grass'}
					startsOnSunday={true}
					daysOfTheWeek={['', 'Mon', '', 'Wed', '', 'Fri', '']}
					includeBoundary={true}
					textColor={'var(--color-text)'}
					cx={12}
					cy={12}
					cr={2}
					scroll={window.innerWidth <= 768}
					style={
						window.innerWidth <= 768
							? {
									width: '100%',
									padding: '0 !important',
								}
							: undefined
					}
					start={
						year === 'last' || !year
							? data.contributions[0].date
							: `${year}-01-01`
					}
					end={
						year === 'last' || !year
							? data.contributions[data.contributions.length - 1].date
							: `${year}-12-31`
					}
					data={data.contributions.map((item) => ({
						[item.date]: {
							level: item.level,
							data: {
								count: item.count ?? 0,
							},
						},
					}))}
					onCellClick={() => {
						// show tooltip
					}}
				/>
			</div>
		</div>
	);
}
