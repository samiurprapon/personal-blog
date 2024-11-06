function Error() {
	return (
		<div className="container">
			<div
				style={{
					display: 'flex',
					alignContent: 'center',
					justifyContent: 'center',
					height: '100vh',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<p style={{ fontSize: '8rem' }}>404</p>
				<br />
				<p style={{ fontSize: '6rem' }}>Page not found!</p>
			</div>
		</div>
	);
}

export default Error;
