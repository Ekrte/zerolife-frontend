import type { NextPage } from "next";
import styled, { useTheme } from "styled-components";
import Image from 'next/image';
import { Formik, Form } from "formik";
import LabeledInput from "../components/LabeledInput";
import * as Yup from "yup";
import axios from "axios";
import DefaultLayout, { PageContainer } from "../layouts";
import getAccessToken from "../apis/getAccessToken";
import { useState } from "react";

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

        .login-button {
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
            -webkit-text-stroke: 1px black;
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

        .signup-button {
            color: white;
            background: ${props => props.theme.colors.gray50};
        }
    }
`;

const Divider = styled.div`
    display: block;
    height: 1px;
    background: ${props => props.theme.colors.gray50};
`

const Button = styled.button`
	display: flex;
    width: 100%;
    height: 48px;
	align-items: center;
	justify-content: center;
	font-family: 'Noto Sans KR', sans-serif;
	font-weight: 700;
	font-size: 14px;
    padding: 8px 24px;
	border-radius: 5px;
    outline: none;
    border: none;
	color: ${props => props.theme.colors.gray80};
	background: ${props => props.theme.colors.secondary20};
`;


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
                        src={'/image/login/login1.png'}
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
                            await getAccessToken(values.email, values.password)
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
                                <div>
                                    <Button 
                                        type="submit"
                                        className="login-button"
                                        onClick={handleSubmit}
                                    >
                                        로그인
                                    </Button>
                                </div>
                                
                            </Form>
                        );
                    }}
                    </Formik>
                    <div className="login-footer">
                        <Divider/>
                        <Button 
                            className="signup-button"
                            onClick={(e) => {
                                location.assign('/consent');
                            }}
                        >
                            회원가입
                        </Button>
                    </div>
                </div>
            </LoginView>
        </PageContainer>
    )
};

export default LoginPage;