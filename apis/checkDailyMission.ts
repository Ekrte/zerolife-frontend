import axios from "axios";

function DataURIToBlob(dataURI: string) {
	const splitDataURI = dataURI.split(',')
	const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
	const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

	const ia = new Uint8Array(byteString.length)
	for (let i = 0; i < byteString.length; i++)
		ia[i] = byteString.charCodeAt(i)

	return new Blob([ia], { type: mimeString });
}

interface checkDailyMissionProps {
	(missionProgressId: number, encodedImage: string, evaluation: "EASY" | "NORMAL" | "HARD"): void
}

const checkDailyMission: checkDailyMissionProps = (missionProgressId, encodedImage, evaluation) => {
	const binaryImageFile = DataURIToBlob(encodedImage);
	const formData = new FormData();
	formData.append("proofImageUrl", binaryImageFile);
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