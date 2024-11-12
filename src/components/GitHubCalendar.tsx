import { useCallback, useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { Loader } from 'lucide-react';
import { ContributionCalendar } from 'react-contribution-calendar';

import { ApiResponse, ApiErrorResponse, Year } from '~/interfaces/GithubAPI';
import { CalendarProps } from '~/interfaces/ContributionsCalendarProps';

import { GITHUB_API_URL, GITHUB_JOIN_YEAR } from '~/configs/environment';

export function GitHubContributionsCalendar({ username }: CalendarProps) {
	const [data, setData] = useState<ApiResponse | null>(null);
	const [startDate, setStartDate] = useState<string>(
		`${new Date().getFullYear()}-01-01`,
	);
	const [endDate, setEndDate] = useState<string>(
		`${new Date().getFullYear()}-12-31`,
	);
	const [year, setYear] = useState<Year>('last');

	const [details, setDetails] = useState<string>('');

	const currentYear = new Date().getFullYear();

	const fetchData = useCallback(() => {
		fetchCalendarData(username, year).then(setData);
	}, [username, year]);

	useEffect(fetchData, [fetchData]);

	if (!data) {
		return <Loader />;
	}

	return (
		<div className="row">
			<div className="col-xs-8 col-md-10">
				<div className="row flex-aligned">
					<div className="col-md-6 col-xs-12">
						<span className="primary-text">
							{data.total[year] || data.total['lastYear']}
						</span>
						<span> contributions in </span>
						<span className="secondary-text">
							{year === 'last' ? 'last year' : year}
						</span>
					</div>

					<div className="col-md-6 col-xs-12">
						<div className={window.innerWidth > 768 ? 'text-right' : ''}>
							<div
								className="italic-text"
								onClick={() => {
									setDetails('');
								}}
							>
								{details}
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-xs-12">
						<ContributionCalendar
							theme={'grass'}
							startsOnSunday={true}
							daysOfTheWeek={['', 'Mon', '', 'Wed', '', 'Fri', '']}
							includeBoundary={true}
							textColor={'var(--color-text)'}
							cx={14}
							cy={14}
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
									: startDate
							}
							end={
								year === 'last' || !year
									? data.contributions[data.contributions.length - 1].date
									: endDate
							}
							data={data.contributions.map((item) => ({
								[item.date]: {
									level: item.level,
									data: {
										count: item.count,
									},
								},
							}))}
							onCellClick={(_, value) => {
								setDetails(
									`${(value?.data as { count: number }).count} contributions on ${formatDay(value?.date)}`,
								);
							}}
						/>
					</div>
				</div>
			</div>
			<div className="col-xs-4 col-md-2">
				<div className="text-center">
					<span
						key="last"
						className={clsx({ selected: year === 'last' })}
						onClick={() => {
							setYear('last');
							setDetails('');
						}}
					>
						Overview
					</span>
				</div>

				{Array.from(
					{ length: currentYear - GITHUB_JOIN_YEAR + 1 },
					(_, i) => currentYear - i,
				).map((selectedYear) => (
					<div className="text-center" key={selectedYear}>
						<span
							key={selectedYear}
							className={clsx({ selected: year === selectedYear })}
							onClick={() => {
								setDetails('');
								setYear(selectedYear);
								setStartDate(`${selectedYear}-01-01`);
								setEndDate(`${selectedYear}-12-31`);
							}}
						>
							{selectedYear}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

async function fetchCalendarData(
	username: string,
	year?: Year,
): Promise<ApiResponse> {
	const response = await fetch(
		`${GITHUB_API_URL}${username}?y=${year ? year : 'last'}`,
	);

	const data = (await response.json()) as ApiResponse | ApiErrorResponse;

	if (!response.ok) {
		throw Error(
			`Fetching GitHub contribution data for "${username}" failed: ${(data as ApiErrorResponse).error}`,
		);
	}

	return data as ApiResponse;
}

function formatDay(dateString?: string) {
	const date = dateString ? new Date(dateString) : new Date();

	// Formatting options
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'short',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	};

	return date.toLocaleDateString('en-US', options);
}
