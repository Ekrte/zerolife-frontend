import Image from "next/image";
import { ShareNetwork } from "phosphor-react";
import styled, { useTheme } from "styled-components";
import { Header, StickyHeader } from "../layouts/header";
import DefaultLayout from "../layouts";
import backgroundImage from "../public/image/status/background.svg";
// import backgroundImage from "../public/image/today/defaultIcon.svg";
import Link from "next/link";
import isLoggedIn from "../hooks/isLoggedIn";
import { useEffect, useState } from "react";
import getMyRewards from "../apis/getMyRewards";
import getMyInfo from "../apis/getMyInfo";

const Title = styled.div`
	font-size: 24px;
	line-height: 150%;
	font-weight: 500;
	color: ${(props) => props.theme.colors.white};
`;

const Content = styled.div`
	position: relative;
	padding: 24px 16px;
	display: flex;
	flex-direction: column;
	flex: 1;
	align-items: center;
	overflow-x: hidden;
	overflow-y: auto;
`;

const MissionGroupWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 600px;
	position: relative;
	margin-top: -4px;
	z-index: 1;
`

const MissionItemWrapper = styled.div<{ reverse: boolean, index: number }>`
	display: flex;
	width: 304px;
	height: 100px;
	${props => props.reverse && "flex-direction: row-reverse;"}
	align-items: center;
	column-gap: 12px;

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

const MissionItem = (props: { id: number, title: string, index: number}) => {
	const { id, title, index } = props;
	return (
		<MissionItemWrapper 
			reverse={index % 2 === 1}
			index={index}
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

const MissionGroup = () => {
	return (
		<MissionGroupWrapper>
			<Image
				layout="fill"
				src={backgroundImage}
				alt={"reward-background"}
				className="reward-background"
			/>
			<MissionItem 
				id={1} 
				title={"비닐봉지 사용하지 않기"}
				index={0}
			/>
			<MissionItem 
				id={2} 
				title={"비닐봉지 사용하지 않기"}
				index={1}
			/>
			<MissionItem 
				id={3} 
				title={"비닐봉지 사용하지 않기"}
				index={2}
			/>
			<MissionItem 
				id={4} 
				title={"비닐봉지 사용하지 않기"}
				index={3}
			/>
			<MissionItem 
				id={5} 
				title={"비닐봉지 사용하지 않기"}
				index={4}
			/>
			<MissionItem 
				id={6} 
				title={"비닐봉지 사용하지 않기"}
				index={5}
			/>
		</MissionGroupWrapper>
	)
}

function MissionStatus() {
	isLoggedIn();
	const [ state, setState ] = useState(0);
	const [ myInfo, setMyInfo ] = useState({});
	const theme = useTheme();

	useEffect(() => {
		getMyRewards((data) => {
			const lastRewardState = data.reduce((a, b) => a.id > b.id ? a : b)
			setState(lastRewardState.id);
		});
		getMyInfo((data) => setMyInfo(data));
	}, []);
	
	return (
		<DefaultLayout>
			<StickyHeader>
				<Header>
					<Title>미션 현황</Title>
					<Link href="/share">
						<ShareNetwork size={28} color="#FFFFFF" />
					</Link>
				</Header>
			</StickyHeader>
			<Content>
				<MissionGroup/>
				<MissionGroup/>
				
			</Content>
			
		</DefaultLayout>
	);
}

export default MissionStatus;
