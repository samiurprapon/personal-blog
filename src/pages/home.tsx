import Hero from '~/components/HeroSection';
import Navigation from '~/components/Navigation';
import { Sidebar } from '~/components/Sidebar';

function HomePage() {
	return (
		<>
			<Navigation />
			<main>
				<Hero />

				<div className="container-fluid">
					<div className="row">
						<div className="col-md-9"></div>
						<div className="col-md-3">
							<Sidebar />
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export default HomePage;
