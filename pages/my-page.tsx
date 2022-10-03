import type { GetServerSideProps } from "next";
import Image from "next/image";
import styled, { useTheme } from "styled-components";
import { Header, StickyHeader } from "../layouts/header";
import DefaultLayout from "../layouts";
import AvatarImage from "../public/avatar.svg";
import Link from "next/link";
import MissionStatusSection from "../components/my-page/MissionStatusSection";
import { useEffect, useState } from "react";
import getMyRewards from "../apis/getMyRewards";
import getMyInfo, { RewardType } from "../apis/getMyInfo";
import axios from "axios";
import Modal from "../components/Modal";
import Button from "../components/Button";

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

const UserInfo = styled.div`
	.user-nickname {
		font-size: 20px;
		font-weight: 500;
		color: ${(props) => props.theme.colors.white};
		margin-bottom: 4px;
	}

	.user-email {
		font-size: 14px;
		font-weight: 200;
		color: ${(props) => props.theme.colors.gray30};
	}
`;

const Section = styled.section`
	font-size: 14px;
	line-height: 21px;
	font-weight: 500;
	border-bottom: 0.5px ${({ theme }) => theme.colors.gray30} solid;
	color: ${(props) => props.theme.colors.white};
	padding: 18px;
`;

const AccountActions = styled.div`
	display: flex;
	margin-top: auto;
	justify-content: end;
	padding: 14px 16px;
	gap: 24px;
`

const GhostButton = styled.button`
	display: inline-flex;
	background: transparent;
	outline: none;
	border: 0;
	font-size: 12px;
	line-height: 1.5;
	font-weight: 500;
	padding: 0px;
	color: ${(props) => props.theme.colors.gray50};
`

const SignOutModalContent = styled.div`
	display: flex;
    flex-direction: column;
    
    justify-content: center;
    padding: 0px 24px;
    font-family: 'Noto Sans KR', sans-serif;

	.signout-warning-message {
		font-weight: 400;
		font-size: 14px;
		line-height: 1.5;
		margin-bottom: 11px;
		white-space: pre-line;
		color: ${props => props.theme.colors.white};
	}

	button {
		margin: 24px 0px;
		width: 100%;
	}
`

function MyPage() {
	//apis/users/achieved-rewards
	const theme = useTheme();
	const email = typeof window === 'undefined' ? undefined : JSON.parse(localStorage.getItem('user') ?? "{}")?.email;
	const [ myInfo, setMyInfo ] = useState<RewardType | undefined>();
	const [ showModal, setShowModal ] = useState(false);
	const [ modalInfo, setModalInfo ] = useState<{ type?: "logOut" | "signOut",title?: string, message?: string, buttonLabel?: string }>({});

	useEffect(() => {
		getMyInfo((data) => setMyInfo(data));
	}, []);

	const logOut = () => {
		localStorage.removeItem('user');
		location.assign('/splash')
	}

	const signOut = () => {
		axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/apis/users`)
			.then(() => logOut)
			.catch((err) => {
				alert("회원 탈퇴에 실패하였습니다. 서버 연결을 확인하세요.");
			})
	}
	
	return (
		<DefaultLayout>
			<StickyHeader>
				<Header>
					<Title>마이 페이지</Title>
				</Header>
			</StickyHeader>
			<AvatarSection>
				<Image src={AvatarImage} alt="avatar Image" />
				<UserInfo>
					<div className="user-nickname">{myInfo?.user?.nickname ?? ""}</div>
					<div className="user-email">{email ?? ""}</div>
				</UserInfo>
			</AvatarSection>
			{myInfo && <MissionStatusSection 
				{...myInfo?.missionState}
			/>}
			<Section>
				<Link href="/complete-missions">참여한 인증 보기</Link>
			</Section>
			<Section>
				<Link href={`/my-rewards?state=${myInfo?.missionState?.achievedRewardsCount ?? 0}`}>내 리워드 보기</Link>
			</Section>
			<Section>
				<Link href={`/agreement`}>이용약관 및 개인정보처리방침</Link>
			</Section>
			<AccountActions>
				<GhostButton 
					onClick={() => {
						setModalInfo({
							type: "logOut",
							title: "로그아웃",
							message: "로그아웃 하시겠습니까?",
							buttonLabel: "확인"
						});
						setShowModal(true);
					}}
				>
					로그아웃
				</GhostButton>
				<GhostButton 
					onClick={() => {
						setModalInfo({
							type: "signOut",
							title: "회원 탈퇴하기",
							message: "탈퇴하시면 모든 회원 정보가 소멸됩니다.\n정말로 탈퇴하시겠습니까?",
							buttonLabel: "확인"
						});
						setShowModal(true);
					}}
				>
					탈퇴하기
				</GhostButton>
			</AccountActions>
			<Modal 
				title={modalInfo?.title ?? ""}
				onBack={() => setShowModal(false)}
				show={showModal}
			>
				<SignOutModalContent>
					<span className="signout-warning-message">
						{modalInfo?.message}
					</span>
					<Button 
						className="signout-button"
						color={"white"}
						background={theme.colors.red.solar}
						onClick={modalInfo?.type === "signOut" ? signOut : logOut}
					>
						{modalInfo?.buttonLabel}
					</Button>
				</SignOutModalContent>
			</Modal>
			
		</DefaultLayout>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {},
    }
}

export default MyPage;
