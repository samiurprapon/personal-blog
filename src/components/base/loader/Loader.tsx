import styled from 'styled-components';
import LoaderIcon from './LoaderIcon';

const LoaderContainer = styled.span`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200px;
`;

export default function Loader() {
	return (
		<LoaderContainer>
			<LoaderIcon fill="#551A8B" />
		</LoaderContainer>
	);
}
