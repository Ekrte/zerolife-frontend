/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import { Smiley, SmileyMeh, SmileyXEyes } from "phosphor-react";
import { ReactNode, useState } from "react";
import styled, { useTheme } from "styled-components";
import { EvaluationType, MissionType } from "./CompleteMissionSection";

// export interface MissionType {
//     "missionProgressId": number,    // 미션 진행 상황 아이디(PK)
//     "missionTitle": string,        // 미션 제목
//     "progressOrder": number,        // 미션 진행 순서 ex) 1일차, 2일차, ...
//     "proofImageUrl": string,       // 미션 인증샷 이미지 URL
//     "evaluation": EvaluationType,          // 미션 평가 -> EASY, NORMAL, HARD
//     "completedAt": string          // 미션 완료 일자
// }

const MissionCardContainer = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	width: 330px;
	border: 1px dashed ${({ theme }) => theme.colors.gray2};
	border-radius: 10px;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	padding: 24px 32px 18px 32px;
	color: ${(props) => props.theme.colors.white};
	border: 1px solid ${(props) => props.theme.colors.gray60};
	background-color: rgba(255, 255, 255, 0.15);

	.mission-image-area {
		position: relative;
		margin-bottom: 24px;
	}

	.mission-evaluation {
		position: absolute;
		top: 5px;
		right: 5px;
		svg > circle:first-of-type {
			fill: ${props => props.theme.colors.secondary20};
		}
	}

	.mission-image {
		border-radius: 5px;
	}

	.mission-tag {
		display: flex;
		padding: 4px 12px;
		background-color: white;
		border-radius: 30px;
		height: 30px;
		box-sizing: border-box;
		
		> span {
			color: ${props => props.theme.colors.gray70};
			font-weight: 500;
			font-size: 14px;
			line-height: 1.5;
		}
	}

	.mission-title {
		font-weight: 500;
		font-size: 20px;
		line-height: 1.5;
		color: white;
		text-align: center;
	}

	.mission-completed-time {
		font-weight: 500;
		font-size: 12px;
		line-height: 1.5;
		color: ${props => props.theme.colors.gray50};
	}
`;



function CompleteMissionCard(props: MissionType) {
    const { missionProgressId, missionTitle, progressOrder, proofImageUrl: encodedImage, evaluation, completedAt } = props;
	const theme = useTheme();
	const [ imagePath, setImagePath ] = useState(`data:image/jpeg;base64,${encodedImage}`);
	const [ imageSize, setImageSize ] = useState("256px");

	const difficutiyIcons: { [key: string]: ReactNode } = {
		EASY: <Smiley alt="EASY Icon" size={40} weight="light" color={theme.colors.gray90}/>,
		NORMAL: <SmileyMeh alt="NORMAL Icon" size={40} weight="light" color={theme.colors.gray90}/>,
		HARD: <SmileyXEyes alt="HARD Icon" size={40} weight="light" color={theme.colors.gray90}/>,
	};


	return (
		<MissionCardContainer>
			<div className={"mission-image-area"}>
				<img
					className="mission-image"
					width={imageSize}	
					height={imageSize}
					src={imagePath}
					onError={() => {
						setImagePath("/image/today/defaultIcon.svg");
						setImageSize("173px");
					}}
					alt={"image of Mission"}
				/>
				<div className="mission-evaluation">
					{difficutiyIcons[evaluation]}
				</div>
			</div>
            <div className="mission-tag"><span>#{progressOrder} 미션</span></div>
            <div className="mission-title">{missionTitle}</div>
            <div className="mission-completed-time">{moment(completedAt).format('YYYY-MM-DD')}</div>
		</MissionCardContainer>
	);
}

export default CompleteMissionCard;
