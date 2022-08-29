import axios from "axios";
import { useRouter } from "next/router";
import getMyInfo from "../apis/getMyInfo";

const isLoggedIn = async () => {
	if (typeof window === 'undefined') return "";
	const user = localStorage.getItem('user');
	
	if(user) {
		const { id, email, accessToken } = JSON.parse(user);
		axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
		await getMyInfo(() => {}, (err) => {
			const error = err?.response?.data?.error;
			if(error?.code?.startsWith?.("E0")) {
				localStorage.removeItem('user');
				location.assign('/splash'); // go to splash page
				return;
			}
		});
		return id;
	} else {
		location.assign('/splash'); // go to splash page
	}
}

export default isLoggedIn;