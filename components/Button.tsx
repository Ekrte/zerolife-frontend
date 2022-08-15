import styled from "styled-components";


const Button = styled.button<{ color?: string, background?: string }>`
	border: 0;
	display: flex;
	height: 48px;
	margin: 24px 17px;
	align-items: center;
	justify-content: center;
	font-family: 'Noto Sans KR', sans-serif;
	font-weight: 500;
	font-size: 16px;
	border-radius: 5px;
	color: ${props => props.color ?? props.theme.colors.gray90};
	background: ${props => props.background ?? props.theme.colors.white};
	${props => props.disabled && `background: ${props.theme.colors.gray40}`}

	box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
`;

export default Button;