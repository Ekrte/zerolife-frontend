import styled from "styled-components";
import Image from "next/image";
import { MissionInfo } from "../../apis/getMissionProgress";

const MissionItemWrapper = styled.div<{ reverse: boolean, isCompleted: boolean }>`
	display: flex;
	width: 304px;
	height: 100px;
	${props => props.reverse && "flex-direction: row-reverse;"}
	align-items: center;
	column-gap: 12px;

	.mission-item-info {
		${props => !props.isCompleted && 'opacity: 0.5;'}
	}

	.mission-item-progress {
		font-size: 16px;
		font-weigth: 500;
		line-hieght: 1.5;
		margin-bottom: 4px;
		color: white;
	}

	.mission-item-title {
		font-size: 12px;
		font-weigth: 500;
		line-hieght: 1.5;
		color: ${props => props.theme.colors.gray10};
	}
`;

const MissionItem = (props: { id: number, title: string, index: number, isCompleted: boolean}) => {
	const { id, title, index, isCompleted } = props;
	return (
		<MissionItemWrapper 
			reverse={index % 2 === 1}
			isCompleted={isCompleted}
		>	
			<Image
				width={70}
				height={70}
				src={`/image/today/defaultIcon.svg`}
				alt={"mission-icon"}
				className="mission-icon"
			/>
			<div className="mission-item-info">
				<div className="mission-item-progress">{`#${id} 미션`}</div>
				<div className="mission-item-title">{title}</div>
			</div>
		</MissionItemWrapper>
	)
}

export default MissionItem;