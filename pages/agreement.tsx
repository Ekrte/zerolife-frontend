import type { GetServerSideProps } from "next";
import { BackHeader, StickyHeader } from "../layouts/header";
import { PageContainer } from "../layouts";
import styled from "styled-components";
import CheckboxMessage from "../components/consent/CheckboxMessage";

const agreementItems = [
    { key: "service", title: "서비스 이용약관", required: true, link: "https://notion-api.splitbee.io/v1/page/1f72a14f109740bfbd7fb4a99a7eb562" }, 
    { key: "privateData", title: "개인정보 수집 및 이용", required: true, link: "https://notion-api.splitbee.io/v1/page/fb2eabb07ec94ff1b4fa923c24d71e44" }, 
    { key: "marketing", title: "마케팅 정보 수신동의", required: false, link: "https://notion-api.splitbee.io/v1/page/6a1c618a1119411bae3bc6ec310e456e" }, 
];
 
const Section = styled.section`
	font-size: 14px;
	line-height: 21px;
	font-weight: 500;
	border-bottom: 0.5px ${({ theme }) => theme.colors.gray30} solid;
	color: ${(props) => props.theme.colors.white};
	padding: 18px;
`;

function CompleteMissions() {
	return (
		<PageContainer className="page-container">
			<StickyHeader>
				<BackHeader
					title="이용약관 및 개인정보처리방침"
					onBack={() => history.back()}
				/>
			</StickyHeader>
			{
				agreementItems.map(agreementItem => (
					<Section key={agreementItem.key}>
						<CheckboxMessage 
							message={`${agreementItem.title} (${agreementItem.required ? "필수" : "선택"})`}
							hideCheck={true}
							link={agreementItem.link}
						/>
					</Section>
				))
			}
		</PageContainer>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {},
    }
}

export default CompleteMissions;
