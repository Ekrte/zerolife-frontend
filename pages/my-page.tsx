import Image from "next/image";
import { ShareNetwork } from "phosphor-react";
import styled from "styled-components";
import { Header, StickyHeader } from "../layouts/header";
import DefaultLayout from "../layouts";
import AvatarImage from "../public/avatar.svg";
import Link from "next/link";
import MissionStatusSection from "../components/my-page/MissionStatusSection";
import isLoggedIn from "../hooks/isLoggedIn";
import { useEffect, useState } from "react";
import getMyRewards from "../apis/getMyRewards";
import getMyInfo, { RewardType } from "../apis/getMyInfo";

const Title = styled.div`
	font-size: 24px;
	line-height: 150%;
	font-weight: 500;
	color: ${(props) => props.theme.colors.white};
`;

const AvatarSection = styled.section`
	padding: 24px 16px;
	display: flex;
	column-gap: 13px;
	align-items: center;
	border-bottom: 0.5px ${({ theme }) => theme.colors.gray30} solid;
`;

const AvatarName = styled.div`
	font-size: 20px;
	font-weight: 500;
	color: ${(props) => props.theme.colors.white};
`;

const Section = styled.section`
	font-size: 14px;
	line-height: 21px;
	font-weight: 500;
	border-bottom: 0.5px ${({ theme }) => theme.colors.gray30} solid;
	color: ${(props) => props.theme.colors.white};
	padding: 18px;
`;

function MyPage() {
	//apis/users/achieved-rewards
	isLoggedIn();
	const [ state, setState ] = useState(0);
	const [ myInfo, setMyInfo ] = useState<RewardType | undefined>();

	useEffect(() => {
		getMyRewards((data) => {
			const lastRewardState = data.filter(e => e.isAchieved).reduce((a, b) => a.id > b.id ? a : b)
			setState(lastRewardState.id);
		});
		getMyInfo((data) => setMyInfo(data));
	}, []);
	
	return (
		<DefaultLayout>
			<StickyHeader>
				<Header>
					<Title>마이 페이지</Title>
					<Link href="/share">
						<ShareNetwork size={28} color="#FFFFFF" />
					</Link>
				</Header>
			</StickyHeader>
			<AvatarSection>
				<Image src={AvatarImage} alt="avatar Image" />
				<AvatarName>{myInfo?.user?.nickname ?? "김지구"}</AvatarName>
			</AvatarSection>
			{myInfo && <MissionStatusSection 
				{...myInfo?.missionState}
			/>}
			<Section>
				<Link href="/complete-missions">참여한 인증 보기</Link>
			</Section>
			<Section>
				<Link href={`/my-rewards?state=${state}`}>내 리워드 보기</Link>
			</Section>
			<Section>
				<Link href={`/agreement`}>이용약관 및 개인정보처리방침</Link>
			</Section>
		</DefaultLayout>
	);
}

export default MyPage;
