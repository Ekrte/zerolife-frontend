import type { NextPage, GetServerSideProps } from "next";
import styled, { useTheme } from "styled-components";
import Image from 'next/image';
import { Formik, Form } from "formik";
import LabeledInput from "../components/LabeledInput";
import * as Yup from "yup";
import { PageContainer } from "../layouts";
import getAccessToken from "../apis/getAccessToken";
import { useState } from "react";
import Button from "../components/Button";
import LoginImg from "../public/image/login/login1.png"
import KakaoLoginImg from "../public/icon/login/kakao.png"
import NaverLoginImg from "../public/icon/login/naver.png"
import GhostButton from "../components/GhostButton";

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('올바르지 않은 이메일 형식입니다.')
        .required('사용자 이메일이 누락되었습니다.'),
    password: Yup.string()
      .min(8, '사용자 비밀번호는 최소 8자 이상이어야 합니다.')
      .max(16, '사용자 비밀번호는 최대 16자 이하여야 합니다.')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, '영문/숫자 조합으로 공백없이 입력해야 합니다.')
      .required('사용자 비밀번호가 누락되었습니다.')
  });

const LoginView = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 24px 17px;
    background-color: ${props => props.theme.colors.gray90};

    .login-image-wrapper {
        display: flex;
        overflow: hidden;
        width: 100%;
        height: 53%;
        align-items: center;
        justify-content: center;
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

        .form-footer {
            margin-top: auto;
        }
    }

    .login-message {
        display: flex;
        flex-direction: column;
        color: ${props => props.theme.colors.white};;
        height: 150px;
        margin-left: 21px;
        margin-right: 21px;
        
        align-items: center;
        justify-contents: center;

        .login-message-title {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 21px;
        }
        
        .login-message-description {
            display: flex;
            flex-direction: column;
            font-size: 16px;
            line-height: 145%;
            font-weight: 400;
            white-space: pre-line;
            text-align: center;
        }
    }

    .login-footer {
        display: flex;
        flex-direction: column;
        margin-top: 18px;
        gap: 18px;
    }
`;

const Divider = styled.div`
    display: block;
    height: 1px;
    background: ${props => props.theme.colors.gray50};
`

const SingUpButton = styled(GhostButton)`
    margin-top: 15px;
    margin-left: auto;
`

const KakaoButton = styled(Button)`
    color: #000000d9;
    background: #FEE500;
    .kakao-login-text {
        margin-left: 4px;
    }
`

const NaverButton = styled(Button)`
    color: #FFFFFF;
    background: #03C75A;
    
    .naver-login-text {
        margin-left: 0px;
    }
`

const LoginPage: NextPage = () => {
    const [backendErrors, setBackendErrors] = useState({});
    const theme = useTheme();
    
	return (
        <PageContainer>
            <LoginView>
                <div className="login-image-wrapper">
                    <Image
                        height={200}
                        width={200}
                        src={LoginImg}
                        alt={'/image/login/login1.png'}
                    />
                </div>
                <div className="login-message">
                    <div className="login-message-title">제로라이프</div>
                    <div className="login-message-description">
                        {`제로웨이스트와 함께하는\n 건강한 지구 만들기`}
                    </div>
                </div>
                <div className="user-form">
                    <Formik
                        initialValues={{ email: '', password: ''}}
                        validationSchema={LoginSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            console.log("onSUbmit!!!");
                            await getAccessToken("ZEROLIFE", values.email, values.password)
                                .then(() => location.assign('/daily-mission'))
                            	.catch((err) => {
                                    const error = err?.response?.data?.error;
                                    const loginErrorMessage = { 
                                        "email": "아이디 혹은 패스워드가 유효하지 않습니다.",
                                        "password": "아이디 혹은 패스워드가 유효하지 않습니다."
                                    }
                                    switch(error?.code) {
                                        case "E1000": setBackendErrors(loginErrorMessage); break;
                                        case "E1001": setBackendErrors(loginErrorMessage); break;
                                        case "E1015": setBackendErrors(loginErrorMessage); break;
                                        default: setBackendErrors({ "password": "로그인에 실패하였습니다. 서버 관리자에게 문의하세요."});
                                    }
                            	});
                            setSubmitting(false);
                        }}
                    >
                    {(props: any) => {
                        const { values, errors, handleSubmit, ...less } = props;

                        return (
                            <Form>
                                <LabeledInput
                                    type="input"
                                    hiddenLabel={true}
                                    accessKey="email"
                                    setBackendErrors={setBackendErrors}
                                    errors={{ ...errors, ...backendErrors }}
                                    value={values.email}
                                    {...less}
                                />
                                <LabeledInput
                                    type="password"
                                    hiddenLabel={true}
                                    accessKey="password"
                                    setBackendErrors={setBackendErrors}
                                    errors={{ ...errors, ...backendErrors }}
                                    value={values.password}
                                    {...less}
                                />
                                <div className="form-footer">
                                    <Button 
                                        type="submit"
                                        color={theme.colors.gray80} 
                                        background={theme.colors.secondary20}
                                        className="login-button"
                                        onClick={handleSubmit}
                                    >
                                        이메일 로그인
                                    </Button>
                                </div>
                            </Form>
                        );
                    }}
                    </Formik>
                    <SingUpButton
                        className="signup-button"
                        onClick={(e) => {
                            console.log("click signup!!");
                            location.assign('/consent/email');
                        }}
                    >
                        {"이메일로 회원가입 하기 >"}
                    </SingUpButton>
                    <div className="login-footer">
                        <Divider/>
                        <KakaoButton
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log("click kako!!!");
                                location.assign('/auth/kakao')
                            }}
                        >
                            <Image
                                width={28}
                                height={28}
                                src={KakaoLoginImg}
                                alt={'/image/icon/kakao.png'}
                            />
                            <span className="kakao-login-text">카카오 로그인</span>
                        </KakaoButton>
                        <NaverButton
                            onClick={(e) => { 
                                console.log('click naver'); 
                                // location.assign('/consent')
                            }}
                        >
                            <Image
                                width={32}
                                height={32}
                                src={NaverLoginImg}
                                alt={'/image/icon/naver.png'}
                            />
                            <span className="naver-login-text">네이버 로그인</span>
                        </NaverButton>
                    </div>
                </div>
            </LoginView>
        </PageContainer>
    )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {},
    }
}

export default LoginPage;