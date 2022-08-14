import type { NextPage } from "next";
import styled, { useTheme } from "styled-components";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import isLoggedIn from "../hooks/isLoggedIn";
import CheckboxMessage from "../components/consent/CheckboxMessage";
import { PageContainer } from "../layouts";
import { ArrowLeft } from "phosphor-react";
import { Formik, Form } from "formik";
import LabeledInput from "../components/LabeledInput";
import ConsentView from "../components/consent/ConsentView";
import * as Yup from "yup";


const agreementItems = [
    { key: "age", title: "만 14세 이상입니다", required: true }, 
    { key: "service", title: "서비스 이용약관", required: true, link: "https://notion-api.splitbee.io/v1/page/1f72a14f109740bfbd7fb4a99a7eb562" }, 
    { key: "privateData", title: "개인정보 수집 및 이용", required: true, link: "https://notion-api.splitbee.io/v1/page/fb2eabb07ec94ff1b4fa923c24d71e44" }, 
    { key: "marketing", title: "마켓팅 정보 수신동의", required: false, link: "https://notion-api.splitbee.io/v1/page/6a1c618a1119411bae3bc6ec310e456e" }, 
];

const SignupSchema = Yup.object().shape({
    nickname: Yup.string()
      .max(15, '한글 혹은 영어 15자 이내 입력해주세요')
      .required('닉네임은 필수값입니다'),
    email: Yup.string()
        .email('이메일 형식으로 입력해주세요')
        .required('이메일은 필수값입니다'),
    password: Yup.string()
      .min(8, '8-16자의 영문/숫자 조합으로 공백없이 입력해주세요')
      .max(16, '8-16자의 영문/숫자 조합으로 공백없이 입력해주세요')
      .required('비밀번호는 필수값입니다'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], '동일한 비밀번호를 입력해주세요')
  });

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
                    <ArrowLeft className="consent-navigation-icon" size={32} weight="regular" onClick={() => history.back()} color={theme.colors.white}/>
                    <div className="consent-title">
                        회원 가입
                    </div>
                </div>
                <div className="user-form">
                    <Formik
                        initialValues={{ nickname: '', email: '', password: '', passwordConfirm: '', }}
                        validationSchema={SignupSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                            }, 400);
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

                        const { values, handleSubmit, ...less } = props;

                        return (
                            <Form>
                                <LabeledInput
                                    type="input"
                                    accessKey="nickname"
                                    value={values.nickname}
                                    {...less}
                                />
                                <LabeledInput
                                    type="input"
                                    accessKey="email"
                                    value={values.email}
                                    {...less}
                                />
                                <LabeledInput
                                    type="password"
                                    accessKey="password"
                                    errors={props.errors}
                                    value={values.password}
                                    {...less}
                                />
                                <LabeledInput
                                    type="password"
                                    accessKey="passwordConfirm"
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