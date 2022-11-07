import axios from "axios";
import { useRouter } from "next/router";
import getMyInfo from "../apis/getMyInfo";

const isLoggedIn = async () => {
	if (typeof window === 'undefined') return "";
	let localUser = localStorage.getItem('user');
	let sessionUser;
	if(!localUser) {
		sessionUser = await axios.get('/auth');
		console.log(sessionUser.data);
		if(sessionUser.data) localStorage.setItem('user', JSON.stringify(sessionUser.data ?? ""));
	}
	const currentUser = sessionUser?.data ?? (localUser ? JSON.parse(localUser ?? "") : undefined);
	console.log(currentUser);
	
	if(currentUser) {
		const { email, accessToken } = currentUser;
		axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
		await getMyInfo(() => {}, (err) => {
			const error = err?.response?.data?.error;
			if(error?.code?.startsWith?.("E0")) {
				localStorage.removeItem('user');
				location.assign('/login'); // previous used user, go to login page
				return;
			}
		});
		return email;
	} else {
		location.assign('/splash'); // new user, go to splash page
	}
}

export default isLoggedIn;