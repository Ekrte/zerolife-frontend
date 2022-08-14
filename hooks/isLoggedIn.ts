import axios from "axios";

const isLoggedIn = async () => {
	if (typeof window === 'undefined') return "";
	const user = localStorage.getItem('user');
	
	if(user) {
		const { id, accessToken } = JSON.parse(user);
		axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
		return id;
	} else {
		location.assign('/splash'); // go to splash page
	}
}

export default isLoggedIn;