import { useEffect } from 'react';
import './top.css';

export default function Top() {
	// Scroll to the top when the button is clicked
	function handleTopEvent() {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
	}

	// Show or hide the button based on scroll position
	function scrollFunction() {
		if (
			document.body.scrollTop > 20 ||
			document.documentElement.scrollTop > 20
		) {
			document.getElementById('topButton')!.style.visibility = 'visible';
		} else {
			document.getElementById('topButton')!.style.visibility = 'hidden';
		}
	}

	// Hook to handle side effects like scrolling
	useEffect(() => {
		window.onscroll = scrollFunction;
		scrollFunction(); // Ensure the button is hidden initially

		return () => {
			window.onscroll = null; // Cleanup on unmount
		};
	}, []);

	return (
		<button onClick={handleTopEvent} id="topButton" title="Go to top">
			<i className="fas fa-hand-point-up" aria-hidden="true"></i>
		</button>
	);
}
