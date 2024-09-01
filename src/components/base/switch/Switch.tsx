import { useState, ChangeEvent } from 'react';
import './switch.css';

import { useStyle } from '~/contexts/StyleContext'; // Adjust import path as needed

export default function Switch() {
	const [isChecked, setChecked] = useState<boolean>(false);
	const { changeTheme } = useStyle();

	const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
		changeTheme();
		setChecked(event.target.checked);
	};

	return (
		<label className="switch">
			<input type="checkbox" checked={isChecked} onChange={handleToggle} />
			<span className="slider round"></span>
		</label>
	);
}
