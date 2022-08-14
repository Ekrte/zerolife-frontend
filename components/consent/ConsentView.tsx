import styled from "styled-components";

const ConsentView = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 100vh;
    
    padding: 0px 16px;

    .consent-navigation {
        display: flex;
        padding: 10.5px 16.5px;
        justify-content: center;
        height: 32px;
        margin-bottom: 20px;

        .consent-navigation-icon {
            position: absolute;
            left: 16px;
        }
    }

    .consent-title {
        font-size: 20px;
        font-weight: 500;
        line-height: 30px;
        color: ${props => props.theme.colors.white};
    }

    .checkbox-message {
        margin-bottom: 16px;
    }

    .form-consent-view {
        margin-top: 12px;

        .consent-view-divider {
            width: 100%;
            height: 1px;
            margin-top: -1px;
            margin-bottom: 16px;
            background-color: ${props => props.theme.colors.gray60};
        }
    }
    
    .user-form {
        display: flex;
        flex-direction: column;
        flex: 1;

        form {
            display: flex;
            flex-direction: column;
            flex: 1;
        }
    }

    .sign-up-footer {
        position:sticky;
        width: 100%;
        box-sizing: border-box;
        padding: 16px 0px 24px 0px;
        background-color: ${props => props.theme.colors.gray90};
        height: 88px;
        bottom: 0px;
        margin-top: auto;

        .consent-sign-up-button {
            margin: 0px;
            width: 100%;
            flex: 1;
        }
    }
`;

export default ConsentView;