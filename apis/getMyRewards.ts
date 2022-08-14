import axios, { AxiosResponse } from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface RewardType {
	id: number, 
	isAchieved: boolean
}

const getMyRewards = (callbackFn: (rewards: RewardType[]) => void) => {
    axios
		.get(`${BACKEND_URL}/apis/users/achieved-rewards`)
		.then((response: AxiosResponse<RewardType[]>) => callbackFn(response.data))
		.catch((err) => {
			console.error(err);
		})
};

export default getMyRewards;