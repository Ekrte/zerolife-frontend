import * as React from "react";
import Image from "next/image";
import SwipeableViews from "react-swipeable-views";
import styled from "styled-components";
import classNames from "classnames";
import splash1 from "../public/image/splash/splash1.png";
import splash2 from "../public/image/splash/splash2.png";
import splash3 from "../public/image/splash/splash3.png";
import splash4 from "../public/image/splash/splash4.png";

const imagePaths = [ splash1, splash2, splash3, splash4 ];

const messages = [
	`깨끗한 지구를 만들기 위해\n제로라이프에 오신 것을 환영해요!`,
	`매일 하루 한 개씩 주어지는\n제로웨이스트 미션`,
	`미션 수행하고\n사진을 찍어 인증해주세요`,
	`매일 빠짐없이 미션에 참여해\n특별한 뱃지도 모아보세요`,
];

const SplashViewWrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	height: 100%;
	background-color: ${(props) => props.theme.colors.gray90};

	> div:first-of-type {
		display: flex;
		flex: 1;
	}

	.splash-swipe-view {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.splash-image-wrapper {
		display: flex;
		overflow: hidden;
		width: 100%;
		height: 65%;
		align-items: center;
		justify-content: center;
	}

	.splash-message-area {
		color: #fff;
		font-size: 20px;
		font-weight: 500;
		line-height: 30px;
		height: 150px;
		margin-left: 21px;
		margin-right: 21px;
		white-space: pre-line;
	}

	.splash-stepper {
		display: flex;
		justify-content: center;
	}

	.splash-stepper-dot {
		width: 8px;
		height: 8px;
		background-color: ${(props) => props.theme.colors.white};
		opacity: 0.5;
		border-radius: 50%;
		margin: 6px;
	}

	.splash-stepper-dot--active {
		opacity: 1;
	}
`;

function SwipeView(props: {
	activeStep: number;
	setActiveStep: Function;
	maxSteps: number;
}) {
	const { activeStep, setActiveStep, maxSteps } = props;

	const handleStepChange = (step: number) => {
		setActiveStep(step);
	};

	return (
		<SplashViewWrapper>
			<SwipeableViews
				axis={"x"}
				index={activeStep}
				onChangeIndex={handleStepChange}
				enableMouseEvents
			>
				{imagePaths.map((imagePath, index) => (
					<div className="splash-swipe-view" key={`splash-image-${index}`}>
						<div className="splash-image-wrapper">
							{Math.abs(activeStep - index) <= 2 ? (
								<Image
									height={300}
									width={300}
									src={imagePath}
									alt={`splash-image-${index}`}
								/>
							) : null}
						</div>
						<div className="splash-message-area">
							<span>{messages[activeStep]}</span>
						</div>
					</div>
				))}
			</SwipeableViews>
			<div className="splash-stepper">
				{Array.from({ length: maxSteps }, (_, i) => (
					<div
						className={classNames("splash-stepper-dot", {
							"splash-stepper-dot--active": activeStep === i,
						})}
						key={i}
					/>
				))}
			</div>
		</SplashViewWrapper>
	);
}

export default SwipeView;
