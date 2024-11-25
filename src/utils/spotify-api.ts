import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import {
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
} from '~/configs/environment';

const spotifyApi = SpotifyApi.withClientCredentials(
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
);

interface NowPlayingItem {
	isPlaying: boolean;
	title: string;
	albumImageUrl: string;
	songUrl: string;
}

export default async function getNowPlayingItem(): Promise<
	false | NowPlayingItem
> {
	// const data = await spotifyApi.users.profile('bsk92qoh0fa7x8sotrf9xys1z');

	const data = await spotifyApi.currentUser.profile();

	console.log(data);

	// get the data from the Spotify API
	const currentTrack = await spotifyApi.player.getCurrentlyPlayingTrack('BD');

	if (!currentTrack) {
		return false;
	}

	return {
		isPlaying: currentTrack.is_playing,
		title: currentTrack.item.name,
		albumImageUrl: currentTrack.device.name,
		songUrl: currentTrack.item.external_urls.spotify,
	};
}
