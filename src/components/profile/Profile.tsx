import { useState, useEffect, lazy, Suspense } from 'react';
import Loading from '~/components/base/loading/Loading';
import { ProfileProps } from '~/interfaces/profile';

const renderLoader = () => <Loading />;
const GithubProfile = lazy(
	() => import('~/components/githubProfile/GitHubProfile'),
);

export default function Profile() {
	const [profile, setProfile] = useState<ProfileProps | undefined>(undefined);

	useEffect(() => {
		const getProfileData = () => {
			const data = {
				name: 'Samiur Prapon',
				bio: '♦️ World is Diamond Shaped.',
				avatarUrl: 'https://avatars.githubusercontent.com/u/25266703',
				location: 'Bangladesh',
			};

			setProfile(data);
		};

		getProfileData();
	}, []);

	return (
		<Suspense fallback={renderLoader()}>
			<GithubProfile props={profile} />
		</Suspense>
	);
}
