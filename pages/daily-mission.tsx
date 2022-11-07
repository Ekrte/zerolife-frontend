import type { GetServerSideProps } from "next";
import styled from "styled-components";
import { Header, StickyHeader } from "../layouts/header";
import DefaultLayout from "../layouts";
import Image from "next/image";
import moment from "moment";
import Modal from "../components/Modal";
import { useCallback, useState, useEffect } from "react";
import MissionCheckModalContent from "../components/daily-mission/MissionCheckModalContent";
import getDailyMission from "../apis/getDailyMission";
import RewardModalContent from "../components/RewardModalContent";
import checkNewRewords from "../apis/checkNewRewords";

const Title = styled.div`
	font-size: 24px;
	line-height: 150%;
	font-weight: 500;
	color: ${(props) => props.theme.colors.white};
`;

const Content = styled.section`
	padding: 32px 21px;
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
		white-space: pre-line;

		b {
			font-weight: 500;
			color: ${props => props.theme.colors.red.solar};
		}
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
		text-align: center;
		margin-bottom: 4px;
	}

	.challenge-complete-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		.challenge-complete-title {
			width: 206px;
			font-weight: 500;
			font-size: 24px;
			line-height: 29px;
			color: white;
			text-align: center;
			margin-bottom: 53px;
			white-space: pre-line;
		}
		padding-top: 20px;
		padding-bottom: 58px;
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

const ChallengeEndCard = () => 
	<Content>
		<Tooltip>
			<span className="message">
				{`축하드려요!! 60일 미션을 모두 마치셨네요!!\n그 동안 제로웨이스트가 조금 익숙해지셨나요?\n`}
				<b>{`처음엔 어려웠겠지만 지금까지 인증한 미션들을 돌아보면 습관이 형성된걸 알 수 있을거에요~`}</b>
			</span>
		</Tooltip>
		<Mission>
			<div className="challenge-complete-container">
				<div className="challenge-complete-title">
					{`60일 미션\n잊지말고\n지속적으로 실천하기`}
				</div>
				<Image
					height={173}
					width={173}
					src={'/image/today/challenge-completed.svg'}
					alt={"challenge-complete-icon"}
					className="challenge-complete-icon"
				/>
			</div>
		</Mission>
	</Content>

const MissionProgressCard = (props: any) => {
	const { mission, sendCaptureRequest, remainingTime, missionIconPath, setMissionIconPath } = props;
	return (
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
							? `${mission.daysOfProgress + 1}일차 미션을 기다려주세요`
							: "미션 인증하기"
						}
					</div>
				</div>
			</Mission>
		}
	</Content>
	)
}


declare global {
	interface Window {
		ReactNativeWebView: any
	}
}


function MyPage() {
	const [ showMissionModal, setShowMissionModal ] = useState(false);
	const [ showRewardModal, setShowRewardModal ] = useState(false);
	const [ challengeCompleted, setChallengeCompleted ] = useState(false);
	const [ rewardId, setRewardId ] = useState(0);
	const [ encodedImage, setEncodedImage ] = useState("");
	const [ mission, setMission ] = useState<{ 
		mission?: {
			category: string,
			description: string,
			guideImageUrl: string,
			method: string,
			title: string
		}, 
		missionProgress?: any, 
		daysOfProgress?: any
	}>({});
	const [ remainingTime, setRemainingTime ] = useState("");
	const [ missionIconPath, setMissionIconPath ] = useState("/image/today/defaultIcon.svg");

	const handleChallengeEnd = useCallback(() => {
		setChallengeCompleted(true);
		setShowRewardModal(true);
	}, [setChallengeCompleted, setShowRewardModal]);

	const getMissionCallback = useCallback((mission: any) => {
		setMission(mission);
		setMissionIconPath(`/image/today/${mission.mission.category.toLowerCase()}-${mission.missionProgress.isCompleted ? "completed" : "progress"}.svg`);
	}, [setMission, setMissionIconPath]);

	const onBackMissionModal= useCallback(() => {
		setShowMissionModal(false);
		setEncodedImage("");
	}, [setShowMissionModal, setEncodedImage]);

	const updateRemainingTime = useCallback(() => {
		const remainingTime = moment().endOf("day").diff(moment());
		const duration = moment.duration(remainingTime);
		if(duration.as('millisecond') <= 1000) {
			setTimeout(() => getDailyMission(getMissionCallback, handleChallengeEnd), 1000);
		}
		const hours = duration.hours().toString().padStart(2, '0');
		const minutes = duration.minutes().toString().padStart(2, '0');
		const formatted = `${hours}:${minutes}`; 
		setRemainingTime(formatted);
	}, [handleChallengeEnd, getMissionCallback]);

	useEffect(() => {
		if(challengeCompleted) return;
		getDailyMission(getMissionCallback, setChallengeCompleted);
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
	}, [challengeCompleted, updateRemainingTime, getMissionCallback]);

	useEffect(() => {
		if(rewardId === 10) setChallengeCompleted(true);
	}, [rewardId])

	const sendCaptureRequest = () => {
		if (window.ReactNativeWebView) {
			if(mission.missionProgress.isCompleted) return;
			window.ReactNativeWebView.postMessage(
				JSON.stringify({ 
					type: "REQ_CAMERA_PERMISSION",
					guideImageUrl: mission.mission?.guideImageUrl,
					method: mission.mission?.method,
				})
			);
		} else {
			alert("모바일 환경이 아닙니다.");
		}
	}
	
	return (
		<DefaultLayout>
			<StickyHeader>
				<Header>
					<Title>오늘의 미션</Title>
				</Header>
			</StickyHeader>
			{challengeCompleted 
				? <ChallengeEndCard />
				: <MissionProgressCard
					mission={mission}
					sendCaptureRequest={sendCaptureRequest}
					remainingTime={remainingTime}
					missionIconPath={missionIconPath}
					setMissionIconPath={setMissionIconPath}
				/>
			}
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
						onSuccess={async () => {
							getDailyMission(getMissionCallback, handleChallengeEnd);
							const data = await checkNewRewords();
							if(data?.length > 0) {
								const rewardId = data[0]?.rewardRequirement / 6;
								// rewardId가 기본적으로 2부터 시작
								setRewardId(rewardId ?? 0);
								setShowRewardModal(true);
							}
						}}
					/>
				</Modal>
			}
			<Modal 
				title="" 
				onBack={() => { setShowRewardModal(false); setRewardId(0); }}
				show={showRewardModal}
			>
				<RewardModalContent
					rewardId={rewardId}
					challengeCompleted={challengeCompleted}
				/>
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
