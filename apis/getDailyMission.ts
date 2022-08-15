import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getDailyMission = (callbackFn: (mission: object) => void, onChallengeEnd?: (status: boolean) => void) => {
    axios
		.get(`${BACKEND_URL}/apis/daily-mission-progress`)
		.then((response) => callbackFn(response.data))
		.catch((err) => {
			console.error(err.response.data);
			const { error } = err.response.data;
			if(error.code === "E3000") {
				axios
				.post(`${BACKEND_URL}/apis/mission-progress`)
				.then((data) => {
					axios
						.get(`${BACKEND_URL}/apis/daily-mission-progress`)
						.then((response) => callbackFn(response.data))
				})
			}

			if(error.code === "E3010") {
				// all done
				onChallengeEnd?.(true);
			}
		})
};

export default getDailyMission;