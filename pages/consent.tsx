import type { NextPage } from "next";
import styled, { useTheme } from "styled-components";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import CheckboxMessage from "../components/consent/CheckboxMessage";
import { PageContainer } from "../layouts";
import { ArrowLeft } from "phosphor-react";
import { Formik, Form } from "formik";
import LabeledInput from "../components/LabeledInput";
import ConsentView from "../components/consent/ConsentView";
import * as Yup from "yup";
import axios from "axios";
import getAccessToken from "../apis/getAccessToken";


const agreementItems = [
    { key: "age", title: "만 14세 이상입니다", required: true }, 
    { key: "service", title: "서비스 이용약관", required: true, link: "https://notion-api.splitbee.io/v1/page/1f72a14f109740bfbd7fb4a99a7eb562" }, 
    { key: "privateData", title: "개인정보 수집 및 이용", required: true, link: "https://notion-api.splitbee.io/v1/page/fb2eabb07ec94ff1b4fa923c24d71e44" }, 
    { key: "marketing", title: "마케팅 정보 수신동의", required: false, link: "https://notion-api.splitbee.io/v1/page/6a1c618a1119411bae3bc6ec310e456e" }, 
];

const SignupSchema = Yup.object().shape({
    nickname: Yup.string()
      .max(15, '한글 혹은 영어 15자 이내로 입력해야 합니다.')
      .matches(/^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/, '한글 혹은 영어 15자 이내로 입력해야 합니다.')
      .required('사용자 닉네임이 누락되었습니다.'),
    email: Yup.string()
        .email('올바르지 않은 이메일 형식입니다.')
        .required('사용자 이메일이 누락되었습니다.'),
    password: Yup.string()
      .min(8, '사용자 비밀번호는 최소 8자 이상이어야 합니다.')
      .max(16, '사용자 비밀번호는 최대 16자 이하여야 합니다.')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, '영문/숫자 조합으로 공백없이 입력해야 합니다.')
      .required('사용자 비밀번호가 누락되었습니다.'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
  });

const Consent: NextPage = () => {
    const [agreementList, setAgreementList] = useState<string[]>([]);
    const [backendErrors, setBackendErrors] = useState({});
    const theme = useTheme();
    
	return (
        <PageContainer className="page-container">
            <ConsentView>
                <div className="consent-navigation">
                    <ArrowLeft className="consent-navigation-icon" size={32} weight="regular" onClick={() => history.back()} color={theme.colors.white}/>
                    <div className="consent-title">
                        회원 가입
                    </div>
                </div>
                <div className="user-form">
                    <Formik
                        initialValues={{ nickname: '', email: '', password: '', passwordConfirm: '', }}
                        validationSchema={SignupSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            await axios
                            	.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/apis/users`, 
                            		{ 
                            			...values,
                                        passwordConfirm: undefined,
                            			marketingAgreement: agreementList.includes("marketing")
                            		})
                            	.then(async (response: any) => {
                                    await getAccessToken(values.email, values.password);
                                    location.assign('/daily-mission');
                                })
                            	.catch((err) => {
                                    const { error } = err.response.data;
                                    switch(error.code) {
                                        case "E1000": setBackendErrors({ "email": "존재하지 않는 사용자입니다." }); break;
                                        case "E1001": setBackendErrors({ "email": "이미 탈퇴한 사용자입니다." }); break;
                                        case "E1003": setBackendErrors({ "email": "사용자 이메일이 누락되었습니다." }); break;
                                        case "E1004": setBackendErrors({ "nickname": "사용자 닉네임이 누락되었습니다." }); break;
                                        case "E1005": setBackendErrors({ "email": "올바르지 않은 이메일 형식입니다." }); break;
                                        case "E1006": setBackendErrors({ "nickname": "올바르지 않은 닉네임 형식입니다." }); break;
                                        case "E1007": setBackendErrors({ "nickname": "사용자 닉네임은 최소 15자 이하여야 합니다." }); break;
                                        case "E1008": setBackendErrors({ "password": "사용자 비밀번호가 누락되었습니다." }); break;
                                        case "E1009": setBackendErrors({ "password": "올바르지 않은 비밀번호 형식입니다." }); break;
                                        case "E1010": setBackendErrors({ "password": "사용자 비밀번호는 최소 8자 이상이어야 합니다." }); break;
                                        case "E1011": setBackendErrors({ "password": "사용자 비밀번호는 최소 16자 이하여야 합니다." }); break;
                                        case "E1013": setBackendErrors({ "email": "이미 중복된 이메일이 존재합니다." }); break;
                                        case "E1014": setBackendErrors({ "nickname": "이미 중복된 닉네임이 존재합니다." }); break;
                                    }
                            	});
                            setSubmitting(false);
                        }}
                    >
                    {(props: any) => {
                        // const {
                        //     values,
                        //     errors,
                        //     touched,
                        //     handleChange,
                        //     handleBlur,
                        //     handleSubmit,
                        //     isSubmitting,
                        // } = props;

                        const { values, errors, handleSubmit, ...less } = props;

                        return (
                            <Form>
                                <LabeledInput
                                    type="input"
                                    accessKey="nickname"
                                    setBackendErrors={setBackendErrors}
                                    errors={{ ...errors, ...backendErrors }}
                                    value={values.nickname}
                                    {...less}
                                />
                                <LabeledInput
                                    type="input"
                                    accessKey="email"
                                    setBackendErrors={setBackendErrors}
                                    errors={{ ...errors, ...backendErrors }}
                                    value={values.email}
                                    {...less}
                                />
                                <LabeledInput
                                    type="password"
                                    accessKey="password"
                                    setBackendErrors={setBackendErrors}
                                    errors={{ ...errors, ...backendErrors }}
                                    value={values.password}
                                    {...less}
                                />
                                <LabeledInput
                                    type="password"
                                    accessKey="passwordConfirm"
                                    setBackendErrors={setBackendErrors}
                                    errors={{ ...errors, ...backendErrors }}
                                    value={values.passwordConfirm}
                                    {...less}
                                />
                                {/* <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button> */}
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
                                        disabled={!agreementItems.every(item => !item.required || agreementList.includes(item.key))}
                                        className="consent-sign-up-button"
                                        color={theme.colors.white}
                                        background={theme.colors.secondary20}
                                        onClick={handleSubmit}
                                    >
                                        가입하기
                                    </Button>
                                </div>
                            </Form>
                        );
                    }}
                    </Formik>
                </div>
                
            </ConsentView>
        </PageContainer>
    )
};

export default Consent;