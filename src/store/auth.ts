import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
	FULL_NAME,
	GITHUB_PROFILE_URL,
	GITHUB_USERNAME,
	VITE_GITHUB_CLIENT_ID,
} from '~/configs/environment';

import { AuthStore, AuthState, GithubUser } from '~/types/auth.type';

const initialState: AuthState = {
	isAuthenticated: true,
	user: {
		id: 1,
		login: GITHUB_USERNAME,
		name: FULL_NAME,
		avatar_url: GITHUB_PROFILE_URL,
		html_url: 'https://github.com/' + GITHUB_USERNAME,
	},
	loading: false,
	error: null,
};

export const useAuthStore = create<AuthStore>()(
	immer((set) => ({
		state: initialState,

		setLoading: (loading: boolean) =>
			set((state) => {
				state.state.loading = loading;
			}),

		setError: (error: string | null) =>
			set((state) => {
				state.state.error = error;
			}),

		setUser: (user: GithubUser | null) =>
			set((state) => {
				state.state.user = user;
				state.state.isAuthenticated = !!user;
			}),

		login: async () => {
			set((state) => {
				state.state.loading = true;
				state.state.error = null;
			});

			try {
				window.location.href = `https://github.com/login/oauth/authorize?client_id=${VITE_GITHUB_CLIENT_ID}&scope=user`;
			} catch {
				// } catch (error) {
				// console.error(error);

				set((state) => {
					state.setError('Failed to initiate GitHub login');
					state.state.loading = false;
				});
			}
		},

		logout: () => {
			set((state) => {
				state.state.user = null;
				state.state.isAuthenticated = false;
				state.state.error = null;
			});
		},
	})),
);
