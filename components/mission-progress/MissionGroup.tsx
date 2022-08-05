import styled from "styled-components";
import Image from "next/image";
import { MissionInfo } from "../../apis/getMissionProgress";
import MissionItem from "./MissionItem";

const MissionGroupWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 600px;
	position: relative;
	
	z-index: 1;
`

const MissionGroup = (props: { missionInfos: MissionInfo[] }) => {
	return (
		<MissionGroupWrapper className="mission-group-status">
			<Image
				layout="fill"
				src={'/image/status/background.svg'}
				alt={"reward-background"}
				className="reward-background"
			/>
			{props.missionInfos.map((missionInfo, i) => {
				const { missionProgressId, missionTitle, progressOrder, isCompleted } = missionInfo;
				return (
					<MissionItem 
						key={missionProgressId}
						id={progressOrder} 
						title={missionTitle}
						index={i}
						isCompleted={isCompleted}
					/>
				)
			})}
		</MissionGroupWrapper>
	)
};

export default MissionGroup;