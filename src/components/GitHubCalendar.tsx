import { useCallback, useEffect, useState } from 'react';
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
		return <p>Loading...</p>;
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-10">
					<div className="row flex-aligned">
						<div className="col-md-6">
							<span style={{ color: '#df6d68' }}>
								{data.total[year] || data.total['lastYear']}
							</span>
							<span> contributions in </span>
							<span style={{ color: '#df6d68' }}>
								{year === 'last' ? 'last year' : year}
							</span>
						</div>

						<div className="col-md-6">
							<div className="text-right">
								<p
									style={{ color: '#f25c54', fontStyle: 'italic' }}
									onClick={() => {
										setDetails('');
									}}
								>
									{details}
								</p>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-xs-12">
							<ContributionCalendar
								theme={'dark_coral'}
								startsOnSunday={true}
								daysOfTheWeek={['', 'Mon', '', 'Wed', '', 'Fri', '']}
								includeBoundary={true}
								textColor="#fff"
								cx={14}
								cy={14}
								cr={2}
								scroll={false}
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
				<div className="col-xs-2">
					<div className="text-center">
						<span
							key="last"
							style={
								year === 'last'
									? { color: '#f25c54', paddingBottom: '8px' }
									: { paddingBottom: '8px' }
							}
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
								style={
									year === selectedYear
										? { color: '#f25c54', paddingBottom: '8px' }
										: { paddingBottom: '8px' }
								}
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
