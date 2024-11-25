import React, { useEffect, useState } from 'react';
import getNowPlayingItem from '~/utils/spotify-api';
import SpotifyLogo from '~/components/spotify/SpotifyLogo';
import PlayingAnimation from '~/components/spotify/PlayingAnimation';

interface NowPlayingItem {
	isPlaying: boolean;
	title: string;
	albumImageUrl: string;
	songUrl: string;
}

const SpotifyNowPlaying: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [result, setResult] = useState<NowPlayingItem | null>(null);

	useEffect(() => {
		getNowPlayingItem()
			.then((data) => {
				setResult(data ? data : null);
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			});
	}, []);

	return (
		<div className="spotify-now-playing">
			<div className="box">
				{loading ? (
					<div className="loading">
						<div className="spinner"></div>
					</div>
				) : (
					<div
						className={`content ${result?.isPlaying ? 'playing' : 'offline'}`}
					>
						<div className="header">
							<SpotifyLogo />
							<span className="status">
								{result?.isPlaying ? 'Now playing' : 'Currently offline'}
							</span>
							{result?.isPlaying && <PlayingAnimation />}
						</div>
						{result?.isPlaying && (
							<div className="song-info">
								<img
									src={result.albumImageUrl}
									alt={`${result.title} album art`}
									className="album-art"
								/>
								<div className="song-details">
									<a
										href={result.songUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="song-title"
									>
										{result.title}
									</a>
									<span className="artist">{'Unknown Artist'}</span>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default SpotifyNowPlaying;
