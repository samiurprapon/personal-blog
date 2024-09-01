import styled from 'styled-components';
import { CardCategoryProps } from '~/interfaces/category';

const StyledCategory = styled.div`
	display: inline-block;
	background: #009bbb;
	border-radius: 4px;
	padding: 3px 15px;
	font-size: 14px;
	// text-transform: uppercase;
	font-weight: 300;
	line-height: 28px;
	margin-right: 10px;
`;

const CardCategory = (props: CardCategoryProps) => (
	<StyledCategory key={props.id} style={{ backgroundColor: `#${props.color}` }}>
		{props.name}
	</StyledCategory>
);

export default CardCategory;
