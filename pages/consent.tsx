import type { NextPage } from "next";
import styled, { useTheme } from "styled-components";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import isLoggedIn from "../hooks/isLoggedIn";
import CheckboxMessage from "../components/consent/CheckboxMessage";
import { PageContainer } from "../layouts";
import { ArrowLeft } from "phosphor-react";

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
`;

const descriptionExample = `1. 개인정보 처리방침이란?
쿠키파킹(Cookieparking)은 이용자의 ‘동의를 기반으로 개인정보를 수집·이용 및 제공’하고 있으며, ‘이용자의 권리 (개인정보 자기결정권)를 적극적으로 보장’합니다. 정보통신서비스제공자가 준수하여야 하는 대한민국의 관계 법령 및 개인정보보호 규정, 가이드라인을 준수하고 있습니다. “개인정보처리방침”이란 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할 수 있도록 회사가 준수해야 할 지침을 의미합니다. 본 개인정보처리방침은 쿠키파킹이 제공하는 쿠키파킹 계정 기반의 서비스(이하 ‘서비스'라 함)에 적용됩니다.
2. 개인정보 수집
서비스 제공을 위한 필요 최소한의 개인정보를 수집하고 있습니다.
회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해 아래와 같은 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다. 또한 사용자가 서비스를 이용하면서 생성, 업로드하거나 다른 사람에게 받는 콘텐츠를 수집합니다. 여기에는 사용자가 수집한 웹링크나 생성한 디렉토리명 등이 포함됩니다. 

구글 로그인 : 이름, 이메일 주소, 프로필 사진
기타 : 관심 분야, 선호도

개인정보를 수집하는 방법은 다음과 같습니다.
개인정보를 수집하는 경우에는 반드시 사전에 이용자에게 해당 사실을 알리고 동의를 구하고 있으며, 아래와 같은 방법을 통해 개인정보를 수집합니다.
회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해 동의를 하고 직접 정보를 입력하는 경우
서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 아래와 같습니다.
PC웹, 모바일 웹/앱 이용 과정에서 단말기정보(OS, 화면사이즈, 디바이스 아이디, 폰기종, 단말기 모델명), IP주소, 쿠키, 방문일시, 부정이용기록, 서비스 이용 기록 등의 정보가 자동으로 생성되어 수집될 수 있습니다.
3. 개인정보 이용
회원관리, 서비스 제공·개선, 신규 서비스 개발 등을 위해 이용합니다.회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해 아래와 같이 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.
회원 식별/가입의사 확인, 본인/연령 확인, 부정이용 방지
만 14세 미만 아동 개인정보 수집 시 법정 대리인 동의여부 확인, 법정 대리인 권리행사 시 본인 확인
친구에게 활동내역을 알리거나 이용자 검색, 등록 등의 기능 제공
신규 서비스 개발, 다양한 서비스 제공, 문의사항 또는 불만처리, 공지사항 전달
서비스의 원활한 운영에 지장을 주는 행위(계정 도용 및 부정 이용 행위 등 포함)에 대한 방지 및 제재
인구통계학적 특성과 이용자의 관심, 기호, 성향의 추정을 통한 맞춤형 컨텐츠 추천 및 마케팅에 활용
개인화 서비스 제공
서비스 이용 기록, 접속 빈도 및 서비스 이용에 대한 통계, 프라이버시 보호 측면의 서비스 환경 구축, 서비스 개선에 활용
4. 개인정보 제공
쿠키파킹은 이용자의 별도 동의가 있는 경우나 법령에 규정된 경우를 제외하고는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 제3자 서비스와의 연결을 위해 아래와 같이 개인정보를 제공하고 있습니다.
쿠키파킹은 이용자의 사전 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 다만, 이용자가 외부 제휴사 등의 서비스를 이용하기 위하여 필요한 범위 내에서 이용자의 동의를 얻은 후에 개인정보를 제3자에게 제공하고 있습니다.
5. 개인정보 파기
개인정보는 수집 및 이용목적이 달성되면 지체없이 파기하며, 절차 및 방법은 아래와 같습니다.
전자적 파일 형태인 경우 복구 및 재생되지 않도록 안전하게 삭제하고, 그 밖에 기록물, 인쇄물, 서면 등의 경우 분쇄하거나 소각하여 파기합니다. 다만, 내부 방침에 따라 일정 기간 보관 후 파기하는 정보는 아래와 같습니다.
아래 정보는 탈퇴일부터 최대 1년간 보관 후 파기합니다.
안내메일 발송 및 CS문의 대응을 위해 쿠키파킹계정과 탈퇴안내 이메일 주소를 암호화하여 보관
저장한 콘텐츠와 디렉토리 정보 비식별 처리하여 보관
개인정보보호와 관련해서 궁금하신 사항은?
서비스를 이용하면서 발생하는 모든 개인정보보호 관련 문의, 불만, 조언이나 기타 사항은 개인정보 보호책임자 및 담당부서로 연락해 주시기 바랍니다. 
개인정보 보호책임자 및 담당부서
책임자 : 이예경
contact : cookieparking@gmail.com 
개인정보 처리방침이 변경되는 경우
법률이나 서비스의 변경사항을 반영하기 위한 목적 등으로 개인정보 처리방침을 수정할 수 있습니다. 개인정보 처리방침이 변경되는 경우 "회사"는 변경 사항을 게시하며, 변경된 개인정보 처리방침은 게시한 날로부터 7일 후부터 효력이 발생합니다. 다만, 수집하는 개인정보의 항목, 이용목적의 변경 등과 같이 이용자 권리의 중대한 변경이 발생할 때에는 최소 30일 전에 미리 알려드리겠습니다.
공고일자 : 2021년 3월 5일
`;


const agreementItems = [
    { key: "age", title: "만 14세 이상입니다", required: true }, 
    { key: "service", title: "서비스 이용약관", required: true, description: descriptionExample }, 
    { key: "privateData", title: "개인정보 수집 및 이용", required: true, description: descriptionExample }, 
    { key: "marketing", title: "마켓팅 정보 수신동의", required: false, description: descriptionExample }, 
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
                            agreementItem={
                                agreementItem.description
                                ? {
                                    title: agreementItem.title,
                                    description: agreementItem.description
                                }
                                : undefined
                            }
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