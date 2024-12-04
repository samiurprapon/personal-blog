import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Github, PencilLine } from 'lucide-react';

import { useAuthStore } from '~/store/auth';
import { Link } from 'react-router-dom';

const ProfileButton: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { state, login, logout } = useAuthStore();
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className="profile-button" ref={dropdownRef}>
			<button
				className="profile-button__trigger"
				onClick={() => setIsOpen(!isOpen)}
				aria-expanded={isOpen}
				aria-label="Profile menu"
			>
				{state.isAuthenticated && state.user ? (
					<img
						src={state.user.avatar_url}
						alt={state.user.name}
						className="profile-button__avatar"
					/>
				) : (
					<User className="profile-button__icon" />
				)}
			</button>

			{isOpen && (
				<div className="profile-button__dropdown">
					{state.isAuthenticated && state.user ? (
						<>
							<div className="profile-button__user">
								<img
									src={state.user.avatar_url}
									alt={state.user.name}
									className="profile-button__user-avatar"
								/>
								<div className="profile-button__user-info">
									<span className="profile-button__user-name">
										{state.user.name}
									</span>
									<span className="profile-button__user-login">
										@{state.user.login}
									</span>
								</div>
							</div>

							<Link to="/write" className="profile-button__action">
								<PencilLine /> Write a post
							</Link>

							<button onClick={logout} className="profile-button__action">
								<LogOut /> Logout
							</button>
						</>
					) : (
						<button onClick={login} className="profile-button__action">
							<Github /> Login with GitHub
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default ProfileButton;
