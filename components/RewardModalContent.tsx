import styled, { useTheme } from "styled-components";
import GetReward from "../public/image/rewards/GetReward.svg";
import CompleteReward from "../public/image/rewards/CompleteReward.svg";
import Image from "next/image";
import Button from "./Button";
import { useEffect, useState } from "react";
import getMyRewards from "../apis/getMyRewards";

const RewardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px 24px;
    font-family: 'Noto Sans KR', sans-serif;

    button {
        margin: 24px;
        width: 100%;
    }
`;

const GetRewardContent = styled.div`
    padding-top: 30px;

    .reward-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
        font-weight: 400;
        line-height: 1.5;
        margin-top: 20px;
        margin-bottom: 48px;

        .reward-message-title {
            font-size: 20px;
            margin-bottom: 4px;
        }

        .reward-message-description {
            font-size: 14px;
        }
    }
`

const CompleteRewardContent = styled.div`
    display: flex;
    flex-direction: column;

    .complete-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        line-height: 1.5;
        margin-top: 12px;
        margin-bottom: 24px;
        white-space: pre-line;
        text-align: center;

        .complete-message-title {
            font-size: 16px;
            color: ${props => props.theme.colors.white};
            margin-bottom: 24px;
            font-weight: 500;
        }

        .complete-message-description {
            font-size: 14px;
            color: ${props => props.theme.colors.gray30};
            font-weight: 400;
        }
    }
`

function RewardModal(props: { rewardId: number, challengeCompleted?: boolean }) {
    const theme = useTheme();
    const [ rewardId, setRewardId ] = useState(props.rewardId);
    const { challengeCompleted } = props;
    const isExpired = challengeCompleted && !props.rewardId;

    useEffect(() => {
        if(isExpired) {
            // 리워드 획득이 아닌 60일 만료로 엔딩 모달이 뜬 경우,
            // 현재 획득한 가장 마지막 reward를 가져온다.
            getMyRewards((data) => {
                const lastRewardState = data.filter(e => e.isAchieved).reduce((a, b) => a.id > b.id ? a : b)
                setRewardId(lastRewardState.id);
            });
        }
    }, [isExpired]);

    return (
        <RewardWrapper>
            {!challengeCompleted
            ? 
            <GetRewardContent>
                <Image
                    width={200}	
                    height={130}
                    src={GetReward}
                    alt={"icon of Reward"}
                    className="reward-icon"
                />
                <div className="reward-message">
                    <div className="reward-message-title">미션 6개 달성!</div>
                    <div className="reward-message-description">리워드 1개 드려요!</div>
                </div>
            </GetRewardContent>
            : <CompleteRewardContent>
                <Image
                    width={200}	
                    height={200}
                    src={CompleteReward}
                    alt={"icon of Reward"}
                    className="reward-icon"
                />
                <div className="complete-message">
                    <div className="complete-message-title">{`60일 동안 제로웨이스트를 실천한 당신을 칭찬합니다.\n작은 습관이 깨끗한 지구를 만들었어요!`}</div>
                    <div className="complete-message-description">{`지금까지 인증한 미션을 잊지 말고\n제로웨이스트 습관을 유지해보세요!`}</div>
                </div>
            </CompleteRewardContent>}
            <Button 
                color={"white"}
                background={theme.colors.secondary20}
                onClick={() => location.assign(`/my-rewards?animate=${isExpired ? 0 : 1}&state=${rewardId - 1}`)}
            >
                {challengeCompleted ? '내 최종 리워드 보러가기' : '리워드 받기'}
            </Button>
        </RewardWrapper>
    )
}

export default RewardModal;
