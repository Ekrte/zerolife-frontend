import styled from "styled-components";
import Image from "next/image";
import { MissionType } from "../../apis/getMissionProgress";

const MissionItemWrapper = styled.div<{ reverse: boolean, isCompleted: boolean }>`
	display: flex;
	width: 304px;
	height: 100px;
	${props => props.reverse && "flex-direction: row-reverse;"}
	align-items: center;
	column-gap: 12px;

	.mission-item-info {
		width: 200px;
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
		font-weight: 500;
		line-height: 1.2;
		white-space: pre-wrap;
		color: ${props => props.theme.colors.gray10};
	}
`;



const MissionItem = (props: { id: number, title: string, index: number, category: MissionType, isCompleted: boolean}) => {
	const { id, title, index, category, isCompleted } = props;
	return (
		<MissionItemWrapper 
			reverse={index % 2 === 1}
			isCompleted={isCompleted}
		>	
			<Image
				width={70}
				height={70}
				src={category ? `/image/today/${category.toLowerCase()}-${isCompleted ? "completed" : "progress"}.svg` : `/image/today/defaultIcon.svg`}
				alt={"mission-icon"}
				className="mission-icon"
			/>
			<div className="mission-item-info">
				<div className="mission-item-progress">{`#${id} 미션`}</div>
				<span className="mission-item-title">{title}</span>
			</div>
		</MissionItemWrapper>
	)
}

export default MissionItem;