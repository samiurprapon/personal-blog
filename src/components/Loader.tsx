import LoaderSVG from '~/assets/images/loader.svg';

const Loader = () => {
	return (
		<div
			className="flex-aligned"
			style={{
				justifyContent: 'center',
				height: '100vh',
				width: '100wh',
				zIndex: 9999,
			}}
		>
			<img src={LoaderSVG} alt="Loading..." />
		</div>
	);
};

export default Loader;
