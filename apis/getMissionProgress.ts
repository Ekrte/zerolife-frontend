import axios, { AxiosResponse } from "axios";

const BACKEND_URL = "http://118.67.128.237";

export interface MissionInfo {
	missionProgressId: number, 
	missionTitle: string,
	progressOrder: number,
	isCompleted: boolean
}

const getMissionProgress = (callbackFn: (missions: MissionInfo[]) => void) => {
    axios
		.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/apis/mission-progress`)
		.then((response: AxiosResponse<MissionInfo[]>) => callbackFn(response.data))
		.catch((err) => {
			console.error(err);
		})
};

// const missionData = [
// 	{
// 		"missionProgressId": 1,      // 미션 진행 상황 아이디(PK)
// 		"missionTitle": "비닐봉지 사용하지 않기",     // 미션 제목
// 		"progressOrder": 1,          // 미션 진행 순서 ex) 1일차, 2일차, ...
// 		"isCompleted": true          // 미션 완료 여부
// 	},
// 	{
// 		"missionProgressId": 2,
// 		"missionTitle": "비닐봉지 사용하지 않기",
// 		"progressOrder": 2,
// 		"isCompleted": false,
// 	},
// 	{
// 		"missionProgressId": 0,
// 		"missionTitle": "비닐봉지 사용하지 않기",
// 		"progressOrder": 3,
// 		"isCompleted": true
// 	},
// 	{
// 		"missionProgressId": 3,
// 		"missionTitle": "비닐봉지 사용하지 않기",
// 		"progressOrder": 4,
// 		"isCompleted": false
// 	},
// 	{
// 		"missionProgressId": 4,
// 		"missionTitle": "비닐봉지 사용하지 않기",
// 		"progressOrder": 5,
// 		"isCompleted": false
// 	},
// 	{
// 		"missionProgressId": 5,
// 		"missionTitle": "비닐봉지 사용하지 않기",
// 		"progressOrder": 6,
// 		"isCompleted": true
// 	},
// 	{
// 		"missionProgressId": 6,
// 		"missionTitle": "비닐봉지 사용하지 않기",
// 		"progressOrder": 7,
// 		"isCompleted": true
// 	},
// 	{
// 		"missionProgressId": 7,
// 		"missionTitle": "비닐봉지 사용하지 않기",
// 		"progressOrder": 8,
// 		"isCompleted": true
// 	},
// 	{
// 		"missionProgressId": 8,
// 		"missionTitle": "비닐봉지 사용하지 않기",
// 		"progressOrder": 9,
// 		"isCompleted": true
// 	},
// 	{
// 		"missionProgressId": 9,
// 		"missionTitle": "비닐봉지 사용하지 않기",
// 		"progressOrder": 10,
// 		"isCompleted": true
// 	},
// 	{
// 		"missionProgressId": 10,
// 		"missionTitle": "비닐봉지 사용하지 않기",
// 		"progressOrder": 11,
// 		"isCompleted": false
// 	},
// 	{
// 		"missionProgressId": 11,
// 		"missionTitle": "비닐봉지 사용하지 않기",
// 		"progressOrder": 12,
// 		"isCompleted": false
// 	},
// ];

// const getMissionProgress = (callbackFn: (missions: MissionInfo[]) => void) => {
//     return callbackFn(missionData);
// };

export default getMissionProgress;