/* eslint-disable @next/next/no-img-element */
import { MouseEventHandler, ReactNode, useState } from "react";
import { Smiley, SmileyMeh, SmileyXEyes } from "phosphor-react";
import styled, { useTheme } from "styled-components";
import Button from "../Button";
import MissionEvaluationItem from "./MissionEvalutionItem";
import checkDailyMission from "../../apis/checkDailyMission";

interface MissionCardProps {
	missionProgressId: number,
	encodedImage: string;
	sendCaptureRequest: MouseEventHandler<HTMLButtonElement>;
	setShowMissionModal: Function;
	onSuccess: Function
}

const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 0px 18px 36px 18px;
	font-family: 'Noto Sans KR', sans-serif;

	.mission-survey {
		margin-top: 18px;
		font-size: 14px;
		font-weight: 400;
		color: white;
	}

	.mission-evaluation {
		margin-top: 12px;
		box-sizing: border-box;
		padding-left: 32px;
		padding-right 32px;
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.mission-actions {
		margin-top: 24px;
		display: flex;
		width: 100%;
		justify-content: space-between;
		flex-direction: row;

		button {
			width: 100%;
			margin: 0px;
			padding-top: 8px;
			padding-bottom: 8px;
			font-size: 16px;
			line-height: 24px;
			height: auto;

			&:first-of-type {
				margin-right: 12px;
			}
		}
	}
`;



function MissionCheckModalContent({ missionProgressId, encodedImage, sendCaptureRequest, setShowMissionModal, onSuccess }: MissionCardProps) {
	const [ evaluation, setEvaluation ] = useState<"EASY" | "NORMAL" | "HARD">("NORMAL");
	const theme = useTheme();

	const sendMissionCheck = async () => {
		try {
			await checkDailyMission(missionProgressId, encodedImage, evaluation);
			await onSuccess();
		} finally {
			setShowMissionModal(false);
		}
	}

	const difficuties: { difficulty: "EASY" | "NORMAL" | "HARD", icon: ReactNode }[] = [
		{
			difficulty: "EASY",
			icon: <Smiley alt="EASY Icon" size={40} weight="light" color={theme.colors.gray90}/>,
		},
		{
			difficulty: "NORMAL",
			icon: <SmileyMeh alt="NORMAL Icon" size={40} weight="light" color={theme.colors.gray90}/>,
		},{
			difficulty: "HARD",
			icon: <SmileyXEyes alt="HARD Icon" size={40} weight="light" color={theme.colors.gray90}/>,
		},
	];

	return (
		<Content>
			<img
				width={"256px"}	
				height={"256px"}
				src={`data:image/jpeg;base64,${encodedImage}`}
				alt={"image of Mission"}
			/>
			<div className="mission-survey">오늘 미션은 어떠셨나요?</div>
			<div className="mission-evaluation">
				{difficuties.map(difficulty => (
					<MissionEvaluationItem 
						key={difficulty.difficulty}
						icon={difficulty.icon}
						difficulty={difficulty.difficulty}
						evaluation={evaluation}
						setEvaluation={setEvaluation}
					/>
				))}
			</div>
			<div className="mission-actions">
				<Button onClick={sendCaptureRequest} color={theme.colors.white} background={theme.colors.gray40}>재촬영</Button>
				<Button onClick={sendMissionCheck} color={theme.colors.gray80} background={theme.colors.secondary20}>인증 완료</Button>
			</div>
		</Content>
	);
}

export default MissionCheckModalContent;