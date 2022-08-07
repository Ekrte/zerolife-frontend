import styled from "styled-components";
import CompleteMissionCard from "./CompleteMissionCard";
import MissionCard from "./CompleteMissionCard";

const Container = styled.div`
	display: flex;
    position: relative;
    flex-direction: column;
    flex: 1;
	align-items: center;
    font-family: 'Noto Sans KR', sans-serif;
    padding: 20px;
    box-sizing: border-box;
    row-gap: 20px;
`;
export type EvaluationType = "EASY" | "NORMAL" | "HARD";

export interface MissionType {
    "missionProgressId": number,    // 미션 진행 상황 아이디(PK)
    "missionTitle": string,        // 미션 제목
    "progressOrder": number,        // 미션 진행 순서 ex) 1일차, 2일차, ...
    "proofImageUrl": string,       // 미션 인증샷 이미지 URL
    "evaluation": EvaluationType,          // 미션 평가 -> EASY, NORMAL, HARD
    "completedAt": string          // 미션 완료 일자
}

function CompleteMissionSection(props: {missions: MissionType[]}) {
    return (
        <Container>
            {props.missions.map(mission => <CompleteMissionCard key={mission.missionProgressId} {...mission} />)}
        </Container>
    )
}

export default CompleteMissionSection;