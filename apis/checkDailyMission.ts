import axios from "axios";

function base64ToBlob(encodedImage: string) {
	const byteString = atob(encodedImage);
	
	const ia = new Uint8Array(byteString.length)
	for (let i = 0; i < byteString.length; i++)
		ia[i] = byteString.charCodeAt(i)

	return new Blob([ia], { type: 'image/jpeg' });
}

interface checkDailyMissionProps {
	(missionProgressId: number, encodedImage: string, evaluation: "EASY" | "NORMAL" | "HARD"): void
}

const checkDailyMission: checkDailyMissionProps = (missionProgressId, encodedImage, evaluation) => {
	const binaryImageFile = base64ToBlob(encodedImage);
	const formData = new FormData();
	formData.append("proofImage", binaryImageFile);
	formData.append("evaluation", evaluation);

	return axios
		.put(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/apis/mission-progress/${missionProgressId}`, 
			formData, 
			{
				headers: {
					'Accepts': 'application/json',
					'Content-Type': 'multipart/form-data'
				},
				maxContentLength: Infinity,
				maxBodyLength: Infinity
			}
		)
		.catch((err) => {
			if(!err?.response?.data) return;
			const { error } = err.response.data;
			alert(error.message)
		})
};

export default checkDailyMission;