import { useCallback, useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import { ContributionCalendar } from 'react-contribution-calendar';

import { CalendarProps } from '~/interfaces/ContributionsCalendarProps';
import { fetchCalendarData } from '~/utils/github-api';
import { ApiResponse } from '~/interfaces/GithubAPI';

export function GitHubContributionsCalendar({ username, year }: CalendarProps) {
	const [data, setData] = useState<ApiResponse | null>(null);

	const fetchData = useCallback(() => {
		fetchCalendarData(username, year).then(setData);
	}, [username, year]);

	useEffect(fetchData, [fetchData]);

	if (!data) {
		return <Loader />;
	}

	return (
		<div className="row">
			<div className="col-xs-12">
				<span className="primary-text">
					{data.total[year] || data.total['lastYear']}
				</span>
				<span> contributions in </span>
				<span className="secondary-text">
					{year === 'last' ? 'last 12 months' : year}
				</span>
			</div>
			<div className="col-xs-12">
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
								}
							: undefined
					}
					start={
						year === 'last' || !year
							? data.contributions[0].date
							: `${new Date().getFullYear()}-01-01`
					}
					end={
						year === 'last' || !year
							? data.contributions[data.contributions.length - 1].date
							: `${new Date().getFullYear()}-12-31`
					}
					data={data.contributions.map((item) => ({
						[item.date]: {
							level: item.level,
							data: {
								count: item.count,
							},
						},
					}))}
					// onCellClick={(_) => {
					// 	// show tooltip
					// }}
				/>
			</div>
		</div>
	);
}
