import { BackHeader, StickyHeader } from "../layouts/header";
import { PageContainer } from "../layouts";
import Image from "next/image";
import isLoggedIn from "../hooks/isLoggedIn";
import { useEffect, useState } from "react";
import CompleteMissionSection, { MissionType } from "../components/complete-missions/CompleteMissionSection";
import getCompleteMissions from "../apis/getCompleteMissions";
import styled from "styled-components";

const EmptyMissionSection = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	
	.mission-empty-container {
		display: flex;
		flex-direction: column;
		row-gap: 40px;
		align-items: center;
	}

	.mission-empty-description {
		color: ${(props) => props.color ?? props.theme.colors.gray60};
	}
`;
 
const EmptyMissionElement = () => (
	<EmptyMissionSection>
		<div className="mission-empty-container">
			<Image src={"/image/emptyNoti.svg"} width={"228px"} height={"187px"} alt="empty Noti Image" />
			<span className="mission-empty-description">참여한 미션이 없어요!</span>
		</div>
	</EmptyMissionSection>
);

function CompleteMissions() {
	const [ missions, setMissions ] = useState<MissionType[]>([]);

	useEffect(() => {
		getCompleteMissions((data: any) => {
			setMissions(data)
		});
	}, []);

	return (
		<PageContainer>
			<StickyHeader>
				<BackHeader
					title="참여한 인증 보기"
					onBack={() => history.back()}
				/>
			</StickyHeader>
			
			{missions.length > 0 
				? <CompleteMissionSection
					missions={missions}
				/>
				: <EmptyMissionElement/>
			}
		</PageContainer>
	);
}

export default CompleteMissions;
