import Error404 from '~/components/error/Error404';
import Navigation from '~/components/header/Navigation';

import { ErrorFooter } from '~/components/error/ErrorFooter';

function Error() {
	return (
		<>
			<Navigation />

			<main className="container">
				<div className="centered-content">
					<div className="flex-justified-aligned">
						<Error404 />
						<h3 className="text-center bigger-text pt-md-4">Page not found!</h3>
					</div>
				</div>
			</main>

			<ErrorFooter />
		</>
	);
}

export default Error;
