import styled from "styled-components";

const SpinnerWrapper = styled.div`
    position: absolute;
    display: flex;
	flex-direction: column;
	box-sizing: border-box;
    max-width: 100vw;
    width: 100%;
    min-height: 100vh;
    max-height: 100%;
    color: ${props => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.background};
    align-items: center;
    justify-content: center;
    z-index: 5000;

    .lds-ripple {
        display: inline-block;
        position: relative;
        width: 160px;
        height: 160px;
      }
      .lds-ripple div {
        position: absolute;
        border: 2px solid ${(props) => props.theme.colors.secondary20};
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
      }
      .lds-ripple div:nth-child(2) {
        animation-delay: -0.5s;
      }
      @keyframes lds-ripple {
        0% {
          top: 72px;
          left: 72px;
          width: 0;
          height: 0;
          opacity: 0;
        }
        4.9% {
          top: 72px;
          left: 72px;
          width: 0;
          height: 0;
          opacity: 0;
        }
        5% {
          top: 72px;
          left: 72px;
          width: 0;
          height: 0;
          opacity: 1;
        }
        100% {
          top: 0px;
          left: 0px;
          width: 144px;
          height: 144px;
          opacity: 0;
        }
      }
`

const Spinner = () => {
    return (
        <SpinnerWrapper>
            <div className="lds-ripple"><div></div><div></div></div>
        </SpinnerWrapper>
    );
};

export default Spinner;