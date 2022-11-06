import styled from "styled-components";

const GhostButton = styled.button<{ color?: string }>`
	display: inline-flex;
	background: transparent;
	outline: none;
	border: 0;
	font-size: 12px;
	line-height: 1.5;
	font-weight: 500;
	padding: 0px;
	color: ${(props) => props.theme.colors.gray50};
`

export default GhostButton;