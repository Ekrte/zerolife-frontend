/* eslint-disable @next/next/no-img-element */
import { Bell } from "phosphor-react";
import styled, { useTheme } from "styled-components";
import { Header, StickyHeader } from "../layouts/header";
import DefaultLayout from "../layouts";
import Image from "next/image";
import moment from "moment";
import BellImage from "../public/icon/Bell.svg";
import PageOverlay from "../components/PageOverlay";
import Modal from "../components/Modal";
import NotificationSection from "../components/NotificationSection";
import { useEffect, useState } from "react";
import MissionCheckModalContent from "../components/daily-mission/MissionCheckModalContent";
import getDailyMission from "../apis/getDailyMission";
import RewardModalContent from "../components/RewardModalContent";
import MyRewardsSection from "../components/my-rewards/MyRewardsSection";
import isLoggedIn from "../hooks/isLoggedIn";

const Title = styled.div`
	font-size: 24px;
	line-height: 150%;
	font-weight: 500;
	color: ${(props) => props.theme.colors.white};
`;

const Content = styled.section`
	padding: 0px 21px;
	display: flex;
	flex-direction: column;
	flex: 1;
	justify-content: center;
`;

const Tooltip = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	background: rgba(255,255,255,0.15);
	padding: 18px 20px;
	border: 0.5px dashed white;
	border-radius: 10px;
	box-sizing: border-box;
	min-height: 100px;
	margin-bottom: 23px;

	// background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23FFFFFF' stroke-width='1' stroke-dasharray='3%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"); border-radius: 10px;

	.message {
		color: white;
		font-weight: 400;
		font-size: 14px;
		line-height: 1.5;
	}
`;

const Mission = styled.div`
	display: flex;
	flex-direction: column;
	// flex: 1;
	padding: 20px;
	background: rgba(255,255,255,0.15);
	border: 0.5px dashed white;
	border-radius: 10px;
	box-sizing: border-box;

	align-items: center;
	justify-content: center;

	.mission-header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.mission-tag {
		display: flex;
		padding: 4px 12px;
		background-color: white;
		border-radius: 30px;
		height: 30px;
		box-sizing: border-box;
		margin-bottom: 18px;
		
		> span {
			color: ${props => props.theme.colors.gray80};
			font-weight: 500;
			font-size: 14px;
			line-height: 1.5;
		}
	}

	.mission-title {
		font-weight: 700;
		font-size: 24px;
		line-height: 29px;
		color: white;
		margin-bottom: 4px;
	}

	.mission-remaining-time {
		font-weight: 500;
		font-size: 12px;
		line-height: 1.5;
		color: white;
		margin-bottom: 49px;
	}

	.mission-upload {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

	}

	.mission-upload-button {
		margin-top: 25px;
		color: ${props=>props.theme.colors.gray5};
		font-weight: 500;
		font-size: 14px;
		line-height: 1.5;
	}
`;

declare global {
	interface Window {
		ReactNativeWebView: any
	}
}


function MyPage() {
	const theme = useTheme();
	const [ showNotification, setShowNotification ] = useState(false);
	const [ showMissionModal, setShowMissionModal ] = useState(false);
	const [ rewardId, setRewardId ] = useState(0);
	
	const [ encodedImage, setEncodedImage ] = useState("");
	const [ mission, setMission ] = useState<{ mission?: any, missionProgress?: any, daysOfProgress?: any}>({});
	const [ remainingTime, setRemainingTime ] = useState("");
	const [ missionIconPath, setMissionIconPath ] = useState("/image/today/defaultIcon.svg");

	const updateRemainingTime = () => {
		const remainingTime = moment().endOf("day").diff(moment());
		const duration = moment.duration(remainingTime);
		const hours = duration.hours().toString().padStart(2, '0');
		const minutes = duration.minutes().toString().padStart(2, '0');
		const formatted = `${hours}:${minutes}`; 
		setRemainingTime(formatted);
	}

	const onBackMissionModal= () => {
		setShowMissionModal(false);
		setEncodedImage("");
	}

	const getMissionCallback = (mission: any) => {
		setMission(mission);
		setMissionIconPath(`/image/today/${mission.mission.category.toLowerCase()}-${mission.missionProgress.isCompleted ? "completed" : "progress"}.svg`);
	};
	
	useEffect(() => {
		async function initPage() {
			try {
				await isLoggedIn();
			} finally {
				getDailyMission(getMissionCallback);
			}
		}
		initPage();

		updateRemainingTime();
		setInterval(updateRemainingTime, 1000);

		const listener = (event: any) => {
			const { file } = JSON.parse(event.data);
			setEncodedImage(file.base64);
			setShowMissionModal(true);
		};

		if (window.ReactNativeWebView) {
			/** android */
			document.addEventListener("message", listener);
			/** ios */
			window.addEventListener("message", listener);
		}

		return () => {
			if (window.ReactNativeWebView) {
				document.removeEventListener("message", listener);
				window.removeEventListener("message", listener);
			}
		}
	}, []);

	const sendCaptureRequest = () => {
		if (window.ReactNativeWebView) {
			if(mission.missionProgress.isCompleted) return;
			window.ReactNativeWebView.postMessage(JSON.stringify({ type: "REQ_CAMERA_PERMISSION"}));
		} else {
			alert("모바일 환경이 아닙니다.");
		}
	}
	
	return (
		<DefaultLayout>
			<StickyHeader>
				<Header>
					<Title>오늘의 미션</Title>
					{/* <Image
						src={BellImage}
						alt="bell Image"
					/> */}
				</Header>
			</StickyHeader>
			<Content>
				{mission.mission && <Tooltip>
					<span className="message">{mission.mission.description}</span>
				</Tooltip>}
				{mission.mission && <Mission onClick={sendCaptureRequest}>
					<div className="mission-header">
						<div className="mission-tag">
							<span>#{mission.daysOfProgress} 미션</span>
						</div>
						<div className="mission-title">{mission.mission.title}</div>
						<div className="mission-remaining-time">
							{mission.missionProgress.isCompleted ?  "미션 수행 완료" : `${remainingTime} 남음`}
						</div>
					</div>
					
					<div className="mission-upload">
						<Image
							height={173}
							width={173}
							src={missionIconPath}
							onError={() => setMissionIconPath("/image/today/defaultIcon.svg")}
							alt={"icon of Mission"}
							className="mission-icon"
						/>
						<div className="mission-upload-button">
							{mission.missionProgress.isCompleted 
								? `${mission.daysOfProgress}일차 미션을 기다려주세요`
								: "미션 인증하기"
							}
						</div>
					</div>
				</Mission>}
			</Content>
			{/* <PageOverlay title="알림" onBack={() => setShowNotification(false)} show={showNotification}>
				<NotificationSection notifications={MOCK_NOTIFICATIONS} />
			</PageOverlay> */}
			{mission?.missionProgress?.id && encodedImage && 
				<Modal title="인증 사진" 
					onBack={onBackMissionModal} 
					show={showMissionModal}
				>
					<MissionCheckModalContent
						missionProgressId={mission.missionProgress.id}
						encodedImage={encodedImage}
						sendCaptureRequest={sendCaptureRequest}
						setShowMissionModal={setShowMissionModal}
						onSuccess={() => getDailyMission(getMissionCallback)}
						setRewardId={setRewardId}
					/>
				</Modal>
			}
			<Modal 
				title="" 
				onBack={() => setRewardId(0)}
				show={rewardId > 0}
			>
				<RewardModalContent 
					rewardId={rewardId}
				/>
			</Modal>
		</DefaultLayout>
	);
}

export default MyPage;
