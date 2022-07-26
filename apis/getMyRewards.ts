import axios, { AxiosResponse } from "axios";

const BACKEND_URL = "http://118.67.128.237";

const getMyRewards = (callbackFn: (rewards: { id: number }[]) => void) => {
    axios
		.get(`${BACKEND_URL}/apis/users/achieved-rewards`)
		.then((response: AxiosResponse<{ id: number }[]>) => callbackFn(response.data))
		.catch((err) => {
			console.error(err);
		})
};

export default getMyRewards;