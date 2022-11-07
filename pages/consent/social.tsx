import type { NextPage, GetServerSideProps } from "next";
import { useTheme } from "styled-components";
import { useState } from "react";
import Button from "../../components/Button";
import { PageContainer } from "../../layouts";
import { ArrowLeft } from "phosphor-react";
import { Formik, Form } from "formik";
import LabeledInput from "../../components/LabeledInput";
import ConsentView from "../../components/consent/ConsentView";
import * as Yup from "yup";
import SocialConsent from "../../components/consent/SocialConsent";
import { useRouter } from "next/router";

const SignupSchema = Yup.object().shape({
    nickname: Yup.string()
      .max(15, '한글 혹은 영어 15자 이내로 입력해야 합니다.')
      .matches(/^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/, '한글 혹은 영어 15자 이내로 입력해야 합니다.')
      .required('사용자 닉네임이 누락되었습니다.')
  });

const ConsentSocial: NextPage = () => {
    const theme = useTheme();
    // const nickname = "Ekrte"
    // const provider = "kakao";
    // const email = "kdysk93@naver.com";
    const router = useRouter()
    console.log(router.query);
    const { nickname, provider, email } = typeof window === 'undefined'
        ? { nickname: "", provider: "", email: "" }
        : router.query;
    const [agreementList, setAgreementList] = useState<string[]>([]);
    const [visibleConsent, setVisibleConsent] = useState(false);
    const [backendErrors, setBackendErrors] = useState({});
    
	return (
        <PageContainer className="page-container">
            <ConsentView>
                <div className="consent-navigation">
                    <ArrowLeft className="consent-navigation-icon" size={32} weight="regular" onClick={() => history.back()} color={theme.colors.white}/>
                </div>
                <div className="user-form">
                    <Formik
                        initialValues={{ nickname: nickname }}
                        validationSchema={SignupSchema}
                        onSubmit={() => {}}
                    >
                    {(props: any) => {
                        const { values, errors, handleSubmit, ...less } = props;
                        console.log(errors);
                        return (
                            <Form>
                                <LabeledInput
                                    type="input"
                                    accessKey="nickname"
                                    label="원하는 닉네임으로 변경해주세요"
                                    setBackendErrors={setBackendErrors}
                                    errors={{ ...errors, ...backendErrors }}
                                    value={values.nickname}
                                    {...less}
                                />
                                
                                <div className="sign-up-footer">
                                    <Button
                                        disabled={Object.keys(errors).length !== 0}
                                        onClick={() => setVisibleConsent(true)}
                                    >
                                        다음
                                    </Button>
                                </div>
                                {visibleConsent && <SocialConsent 
                                    setVisible={setVisibleConsent} 
                                    email={email as string} 
                                    nickname={nickname as string} 
                                    provider={provider as string}
                                    agreementList={agreementList}
                                    setAgreementList={setAgreementList}
                                    setBackendErrors={setBackendErrors}
                                />}
                            </Form>
                        );
                    }}
                    </Formik>
                </div>
            </ConsentView>
        </PageContainer>
    )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {}
    }
}

export default ConsentSocial;