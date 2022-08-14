import styled from "styled-components";
import MissionCard, { MissionStatusType } from "./MissionStatusCard";

const SectionContainer = styled.section`
	padding: 24px 16px 24px 16px;
	display: flex;
	row-gap: 16px;
	flex-direction: column;
	border-bottom: 1px ${({ theme }) => theme.colors.gray30} solid;
`;

const MissionCardContainer = styled.ul`
	display: flex;
	column-gap: 6px;
`;

const SectionTitle = styled.div`
	font-size: 14px;
	line-height: 21px;
	font-weight: 500;
	color: ${(props) => props.theme.colors.white};
`;

interface MissionStatusSectionProps {
	completedMissionsCount: number,
	leftMissionsCount: number,
	achievedRewardsCount: number
} 

function MissionStatusSection(props: MissionStatusSectionProps) {

	const MissionLinks: { name: MissionStatusType; text: string, count: number }[] =
	[
		{
			name: "COMPLETED",
			text: "완료 미션",
			count: props.completedMissionsCount,
		},
		{
			name: "UNCOMPLETED",
			text: "미완료 미션",
			count: props.leftMissionsCount,
		},
		{
			name: "TOTAL",
			text: "총 미션",
			count: props.achievedRewardsCount,
		},
	];

	return (
		<SectionContainer>
			<SectionTitle>미션 현황</SectionTitle>
			<MissionCardContainer>
				{MissionLinks.map((missionLink) => (
					<MissionCard
						key={missionLink.name}
						type={missionLink.name}
						text={missionLink.text}
						number={missionLink.count}
					/>
				))}
			</MissionCardContainer>
		</SectionContainer>
	);
}

export default MissionStatusSection;
