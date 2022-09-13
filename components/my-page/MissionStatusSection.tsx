import styled from "styled-components";
import MissionCard, { MissionCardType } from "./MissionStatusCard";

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
	achievedRewardsCount: number,
	state: number,
} 

function MissionStatusSection(props: MissionStatusSectionProps) {

	const MissionLinks: { name: MissionCardType; text: string, link: string, count: number }[] =
	[
		{
			name: "COMPLETED",
			text: "완료 미션",
			link: "/complete-missions",
			count: props.completedMissionsCount,
		},
		{
			name: "REMAIN",
			text: "남은 미션",
			link: `/mission-status`,
			count: props.leftMissionsCount,
		},
		{
			name: "REWARD",
			text: "내 리워드",
			link: `/my-rewards?state=${props.state}`,
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
						link={missionLink.link}
					/>
				))}
			</MissionCardContainer>
		</SectionContainer>
	);
}

export default MissionStatusSection;
