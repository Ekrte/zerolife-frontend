import type { NextPage } from "next";
import styled, { useTheme } from "styled-components";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import isLoggedIn from "../hooks/isLoggedIn";
import CheckboxMessage from "../components/consent/CheckboxMessage";
import { PageContainer } from "../layouts";
import { ArrowLeft } from "phosphor-react";
import { Formik } from "formik";

const ConsentView = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
    
    padding: 10px 16px;

    .consent-navigation {
        height: 32px;
        margin-bottom: 36px;
    }

    .consent-title {
        font-size: 20px;
        font-weight: 500;
        line-height: 30px;
        color: ${props => props.theme.colors.white};
        margin-bottom: 242px;
    }

    .checkbox-message {
        margin-bottom: 24px;
    }

    .consent-view-divider {
        width: 100%;
        height: 1px;
        margin-top: -1px;
        margin-bottom: 18px;
        background-color: ${props => props.theme.colors.gray60};
    }

    .consent-sign-up-button {
        margin-top: auto;
    }
    
    .user-form {
        display: flex;
        flex-direction: column;

        form {
            display: flex;
            flex-direction: column;
        }
        
    }
`;

const agreementItems = [
    { key: "age", title: "만 14세 이상입니다", required: true }, 
    { key: "service", title: "서비스 이용약관", required: true, link: "https://notion-api.splitbee.io/v1/page/1f72a14f109740bfbd7fb4a99a7eb562" }, 
    { key: "privateData", title: "개인정보 수집 및 이용", required: true, link: "https://notion-api.splitbee.io/v1/page/fb2eabb07ec94ff1b4fa923c24d71e44" }, 
    { key: "marketing", title: "마켓팅 정보 수신동의", required: false, link: "https://notion-api.splitbee.io/v1/page/6a1c618a1119411bae3bc6ec310e456e" }, 
];

const Consent: NextPage = () => {
    const [agreementList, setAgreementList] = useState<string[]>([]);
    const theme = useTheme();

    useEffect(() => {
        async function initPage() {
			try {
				await isLoggedIn();
			} finally {
                
			}
		}
		initPage()
    }, [])
    
	return (
        <PageContainer className="page-container">
            <ConsentView>
                <div className="consent-navigation">
                    <ArrowLeft size={32} weight="regular" onClick={() => history.back()} color={theme.colors.white}/>
                </div>
                <div className="consent-title">
                    약관 동의
                </div>
                
                <CheckboxMessage 
                    message={"제로라이프 이용약관 전체 동의"} 
                    checked={agreementList.length === agreementItems.length} 
                    handleChange={(checked: boolean) => { 
                        if(checked) setAgreementList(agreementItems.map(a => a.key));
                        else setAgreementList([]); 
                    }}
                />
                <div className="consent-view-divider"/>
                {
                    agreementItems.map(agreementItem => {
                        return <CheckboxMessage 
                            message={`${agreementItem.title} (${agreementItem.required ? "필수" : "선택"})`}
                            key={agreementItem.key}
                            checked={agreementList.includes(agreementItem.key)} 
                            link={agreementItem.link}
                            handleChange={(checked: boolean) => {
                                if(checked) setAgreementList(prev => prev.concat(agreementItem.key));
                                else setAgreementList(prev => prev.filter(item => item !== agreementItem.key));
                            }}
                        />
                    })
                }
                <Button 
                    disabled={!agreementItems.every(item => !item.required || agreementList.includes(item.key))}
                    className="consent-sign-up-button"
                    color={theme.colors.white}
                    background={theme.colors.secondary20}
                    onClick={() => console.log("회원가입..")}
                >
                    회원 가입
                </Button>
            </ConsentView>
        </PageContainer>
    )
};

export default Consent;