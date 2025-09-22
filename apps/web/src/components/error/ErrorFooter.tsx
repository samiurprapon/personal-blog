import { GITHUB_USERNAME } from '~/configs/environment';

export function ErrorFooter() {
	return (
		<footer className='container-fluid error-footer'>
			<div className='error-footer-top '>
				<div className='error-footer_bg'>
					<div className='error-footer_bg__cyclist' />
				</div>
			</div>
			<div className='error-footer-bottom'>
				<p>&copy; {GITHUB_USERNAME}</p>
			</div>
		</footer>
	);
}
