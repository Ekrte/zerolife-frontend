import axios from "axios";

interface checkDailyMissionProps {
	(missionProgressId: number, encodedImage: string, evaluation: "EASY" | "NORMAL" | "HARD"): void
}

const checkDailyMission: checkDailyMissionProps = (missionProgressId, encodedImage, evaluation) => 
	axios
		.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/apis/mission-progress/${missionProgressId}`, {
			proofImageUrl: encodedImage,
			evaluation: evaluation,
		}, {
			headers: {
				'Accepts': 'application/json',
				'Content-Type': 'application/json'
			},
			maxContentLength: Infinity,
        	maxBodyLength: Infinity
		})
		.catch((err) => {
			if(!err?.response?.data) return;
			const { error } = err.response.data;
			alert(error.message)
		})

export default checkDailyMission;