export interface GithubUser {
	id: number;
	login: string;
	name: string;
	avatar_url: string;
	html_url: string;
}

export interface AuthState {
	isAuthenticated: boolean;
	user: GithubUser | null;
	loading: boolean;
	error: string | null;
}

export interface AuthStore {
	state: AuthState;
	setLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
	setUser: (user: GithubUser | null) => void;
	login: () => Promise<void>;
	logout: () => void;
}
