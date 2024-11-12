function Error() {
	return (
		<div className="container">
			<div
				style={{
					display: 'flex',
					alignContent: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<p style={{ fontSize: '8rem' }}>
					404
					<br />
					Page not found!
				</p>
			</div>
		</div>
	);
}

export default Error;
