import styled, { useTheme } from "styled-components";
import { Header, StickyHeader } from "../layouts/header";
import DefaultLayout from "../layouts";
import ReactDOM from "react-dom";
import isLoggedIn from "../hooks/isLoggedIn";
import { forwardRef, useEffect, useRef, useState } from "react";
import getMissionProgress, { MissionInfoProps } from "../apis/getMissionProgress";
import MissionGroup from "../components/mission-progress/MissionGroup";
import { CaretUp } from "phosphor-react";

const Title = styled.div`
	font-size: 24px;
	line-height: 150%;
	font-weight: 500;
	color: ${(props) => props.theme.colors.white};
`;

const Content = styled.div`
	position: relative;
	padding: 0px 16px 20px 16px;
	display: flex;
	flex-direction: column;
	flex: 1;
	align-items: center;
	justify-contents: center;
	overflow-x: hidden;
	overflow-y: auto;

	div:not(.mission-group-status) + .mission-group-status {
		margin-top: 16px;
	}

	.mission-group-status ~ .mission-group-status {
		margin-top: -4px;
	}
`;

const StartDiv = styled.div`
	position: relative;
	display: flex;
	z-index: 2;
	width: 343px;

	svg {
		position: absolute;
		top: 15px;
	}
`;

const StartImage = forwardRef((_, ref: any) => {
	return (
		<StartDiv ref={ref}>
			<Tag start={true}>START</Tag>
			<svg fill="none" width="310" height="110" viewBox="0 0 310 110" xmlns="http://www.w3.org/2000/svg">
				<path
					stroke="white"
					strokeWidth="6px"
					strokeLinecap="round"
					d="M 260 3 h -214 c -10 0, -43 10, -43 45"
				/>
			</svg>
		</StartDiv>
	);
});

StartImage.displayName = "StartImage";

const Tag = styled.span<{ start?: boolean }>`
	position: absolute;
	z-index: 3;
	${props => props.start && 'right: 0;'}

	border-radius: 30px;
	padding: 4px 16px;
	font-weight: 500;
	font-size: 20px;
	line-height: 1.5;
	background-color: white;
	box-sizing: border-box;
	color: ${props => props.theme.colors.gray90};
`

const EndDiv = styled.div`
	position: relative;
	display: flex;
	z-index: 2;
	width: 343px;
	margin-top: -19px;

	svg {
		position: absolute;
		top: 15px;
	}
`;

const ContinueButton = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 45px;
	z-index: 5;
	bottom: -44px;
	
	background: rgba(178, 177, 186, 0.5);

	span {
		color: white;
		opacity: 1;
	}

	.scroll-up-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		margin-left: 8px;
		border-radius: 14px;
		background: white;
	}
`

const EndImage = () => {
	return (
		<EndDiv>
			<Tag>END</Tag>
			<svg fill="none" width="310" height="110" viewBox="0 0 310 110" xmlns="http://www.w3.org/2000/svg">
				<path
					stroke="white"
					strokeWidth="6px"
					strokeLinecap="round"
					d="M 0 3 h 270"
				/>
			</svg>
		</EndDiv>
	);
}

const ContinueImage = (props: { handleClick: any }) => {
	return (
		<EndDiv>
			<svg fill="none" width="344" height="50" viewBox="0 0 304 50" xmlns="http://www.w3.org/2000/svg">
				<path
					stroke="#817F8A"
					strokeDasharray="22 10"
					strokeWidth="3px"
					d="M 260 2 h -218 c -80 0, -80 100, 0 100"
				/>
			</svg>
			{typeof window !== 'undefined' && ReactDOM.createPortal(
				<ContinueButton 
					className="mission-continue" 
					onClick={props.handleClick}
				>
					<span>comming soon</span>
					<div className="scroll-up-button">
						<CaretUp size={16} weight="bold"/>
					</div>
				</ContinueButton>,
				document.getElementById("mission-status-content") as HTMLElement
			)}
		</EndDiv>
	);
}

function MissionStatus() {
	const [ missionProgress, setMissionProgress ] = useState<MissionInfoProps[][]>([]);
	const rootTopRef = useRef<HTMLDivElement>(null);
	const contentTopRef = useRef<HTMLDivElement>(null);
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		async function initPage() {
			try {
				await isLoggedIn();
				await new Promise(resolve => setTimeout(resolve, 500));
			} finally {
				getMissionProgress((data) => {
					let chunks = [];
					for(let i = 0; i < data.length / 6; i++) {
						chunks.push(data.slice(i * 6, i * 6 + 6));
					}
					console.log(chunks);
					setMissionProgress(chunks);
				});
				bottomRef.current?.scrollIntoView({behavior: 'smooth'});
			}
		}
		initPage();
	}, []);
	
	return (
		<DefaultLayout>
			<div className="top" ref={rootTopRef}/>
			<Header>
				<Title>미션 현황</Title>
			</Header>
			<Content id="mission-status-content">
				{missionProgress.length >= 1 && 
					<>
						<div className="top" style={{ marginBottom: 20 }} ref={contentTopRef}/>
						<StartImage/>
						{missionProgress.map(missionChunk => 
							<MissionGroup 
								key={missionChunk.reduce((a, b) => a + b.missionProgressId.toString(), "")}
								missionInfos={missionChunk} 
							/>
						)}
						{missionProgress.length === 10 
							? <EndImage/> 
							: <ContinueImage 
								handleClick={() => { 
									rootTopRef?.current?.scrollIntoView({ behavior: "auto", block: "start", inline: "start" })
									contentTopRef?.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" })
								}}
							/>
						}
						<div className="bottom" ref={bottomRef}/>
					</>
				}
			</Content>
		</DefaultLayout>
	);
}

export default MissionStatus;
