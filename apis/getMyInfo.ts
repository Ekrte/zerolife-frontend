import axios, { AxiosResponse } from "axios";

const BACKEND_URL = "http://118.67.128.237";

export interface RewardType {
	user: {                     // 회원 정보
		profileImageUrl: string,    // 프로필 이미지 Url
		nickname: string,            // 닉네임
	},
	missionState: {                   // 미션 현황
		completedMissionsCount: number,    // 완료한 미션 수
		leftMissionsCount: number,         // 남은 미션 수
		achievedRewardsCount: number       // 달성한 리워드 수
	}
}

const getMyInfo = async (callbackFn: (rewards: RewardType) => void) => 
    axios
		.get(`${BACKEND_URL}/apis/users/mypage`)
		.then((response) => callbackFn(response.data))
		.catch((err) => {
			console.error(err);
		})
;

export default getMyInfo;