import Error404 from '~/components/Error404';
import Navigation from '~/components/Navigation';

import { ErrorFooter } from '~/components/ErrorFooter';

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
