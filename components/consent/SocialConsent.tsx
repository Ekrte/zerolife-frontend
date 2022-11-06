import { createPortal } from "react-dom";
import styled, { useTheme } from "styled-components";
import { ArrowLeft } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import PageContainerOverlay from "../../layouts/PageContainerOverlay";
import CheckboxMessage from "./CheckboxMessage";
import { agreementItems } from "../../pages/consent/email";
import sha256 from 'crypto-js/sha256';
import Button from "../Button";
import signUpRequest from "../../apis/signUpRequest";
import ConsentView from "./ConsentView";

interface ISocialConsent {
    setVisible: Function, 
    email: string, 
    nickname: string, 
    provider: string,
    agreementList: string[],
    setAgreementList: any,
    setBackendErrors: any
}

const SocialConsentOverlay = styled(PageContainerOverlay)`
    padding: 0px; 
    .consent-summary {
        font-size: 16px;
        line-height: 1.3;
        text-size-adjust: 100%;
        margin-bottom: 48px;
        white-space: pre-wrap;
    }
`;

const SocialConsent = (props: ISocialConsent) => {
    const theme= useTheme();
    const contentTopRef = useRef<HTMLDivElement>(null);
    const { email, nickname, provider, setBackendErrors, agreementList, setAgreementList } = props;
    const isSignUpDisabled = !agreementItems.every(item => !item.required || agreementList.includes(item.key));

    useEffect(() => {
        contentTopRef?.current?.scrollIntoView({ behavior: "auto" })
    }, [contentTopRef]);

    const genPassHash = (provider: string, email: string) => {
        return sha256(`zerolife:${provider}:${email}`).slice(0, 16);
    }

    if(typeof window === 'undefined') return <></>;
    const container = document.getElementsByClassName("page-container");
    if(!container) return <></>;

    return createPortal(
        <SocialConsentOverlay>
            <ConsentView>
                <div className="description-container">
                    <div className="top" ref={contentTopRef}/>
                    <div className="consent-navigation">
                        <ArrowLeft 
                            size={32} 
                            className="consent-navigation-icon"
                            weight="regular" 
                            onClick={(e) => { e.stopPropagation(); props.setVisible(false);}} 
                            color={theme.colors.white}
                        />
                    </div>
                    <div className="consent-summary">
                        {`제로라이프에서 ${email} 회원님의 개인정보에 접근합니다.\n\n이용자 식별자 및 제공된 개인정보는 이용자 식별, 통계, 계정 연동 등을 위해 서비스 이용기간 동안 활용/보관됩니다. 본 제공 동의를 거부할 권리가 있으나, 동의를 거부하실 경우 서비스 이용이 제한될 수 있습니다.`}
                    </div>
                    <div>
                        <div className="form-consent-view">
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
                        </div>
                        <div className="sign-up-footer">
                            <Button 
                                disabled={isSignUpDisabled}
                                className="consent-sign-up-button"
                                color={isSignUpDisabled ? theme.colors.white : theme.colors.gray80}
                                background={theme.colors.secondary20}
                                onClick={() => signUpRequest({ 
                                    nickname: nickname,
                                    email: email,
                                    password: genPassHash(provider, email),
                                    marketingAgreement: agreementList.includes("marketing")
                                }, setBackendErrors)}
                            >
                                가입하기
                            </Button>
                        </div>
                    </div>
                </div>
            </ConsentView>
        </SocialConsentOverlay>, container[0]);
};

export default SocialConsent;