import styled from 'styled-components';

const PageContainerOverlay = styled.div`
    position: absolute;
    display: flex;
	flex-direction: column;
	box-sizing: border-box;
    max-width: 100%;
    width: 100%;
    left: 0px;
    min-height: 100vh;
    max-height: 100%;
    padding-left: 16px;
    padding-right: 16px;
    color: ${props => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.background};
    z-index: 5000;

    @media screen and (min-width: 685px) {
		margin: 0 auto;
		width: 650px;
	}
`;

export default PageContainerOverlay;