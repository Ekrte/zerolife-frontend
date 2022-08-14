import axios from "axios";

const getCompleteMissions = async (callbackFn: (rewards: object[]) => void) => 
    axios
		.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/apis/users/completed-missions`)
		.then((response) => callbackFn(response.data))
		.catch((err) => {
			console.error(err);
		})
;

export default getCompleteMissions;