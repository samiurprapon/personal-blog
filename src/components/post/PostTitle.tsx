import styled from 'styled-components';

const PostTitle = styled.h1`
	font-size: 2rem;
	line-height: normal;
	white-space: pre-wrap;
	margin-top: 0;

	@media (max-width: 768px) {
		font-size: 1.75rem;
		line-height: normal;
		white-space: pre-wrap;
		margin-top: 0;
	}
`;

export default PostTitle;
