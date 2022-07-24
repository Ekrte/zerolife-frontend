import { Calendar, CalendarCheck, CalendarX } from "phosphor-react";
import { ReactNode } from "react";
import styled from "styled-components";

export type MissionType = "TOTAL" | "COMPLETED" | "UNCOMPLETED";

interface MissionCardProps {
	type: MissionType;
	text: string;
	number: number;
}

const Text = styled.div`
	font-size: 12px;
`;

const StrongText = styled.span`
	font-size: 18px;
	line-height: 27px;
	font-weight: 700;
`;

const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const MissionCardContainer = styled.li`
	border: 1px dashed ${({ theme }) => theme.colors.gray2};
	border-radius: 10px;
	flex: 1;
	padding: 12px 0px 8px 0px;
	color: ${(props) => props.theme.colors.white};
	background-color: rgba(255, 255, 255, 0.15);
	cursor: pointer;
`;

const ItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	row-gap: 6px;
	padding: 12px 0px 8px 0px;
`;

const MissionIcon: Record<MissionType, ReactNode> = {
	COMPLETED: <CalendarCheck size={28} />,
	TOTAL: <Calendar size={28} />,
	UNCOMPLETED: <CalendarX size={28} />,
};

function MissionCard({ type, number, text }: MissionCardProps) {
	return (
		<MissionCardContainer>
			<ItemContainer>
				{MissionIcon[type]}
				<TextContainer>
					<Text>{text}</Text>
					<Text>
						<StrongText>{number}</StrongText>개
					</Text>
				</TextContainer>
			</ItemContainer>
		</MissionCardContainer>
	);
}

export default MissionCard;
