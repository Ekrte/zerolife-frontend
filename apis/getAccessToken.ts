import axios from "axios";

const getAccessToken = (email: string, password: string) => 
	axios
		.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/apis/auth/token`,
			{ 
				email: email, 
				password: password,
			})
		.then((response: any) => {
			localStorage.setItem('user', JSON.stringify({...response.data, email: email})); // for saving a token to localStorage from authenicated session
			axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
		});

export default getAccessToken;