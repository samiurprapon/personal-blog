import Hero from '~/components/HeroSection';
import Navigation from '~/components/Navigation';

function HomePage() {
	return (
		<>
			<Navigation />
			<main>
				<Hero />
			</main>
		</>
	);
}

export default HomePage;
