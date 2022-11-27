import axios from "axios";

const getAccessToken = (provider: string, email: string, password: string) => 
	axios
		.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/apis/auth/token`,
			{ 
				provider: provider,
				email: email, 
				password: password,
			})
		.then((response: any) => {
			localStorage.setItem('user', JSON.stringify({
				...response.data, 
				provider: provider,
				email: email
			})); // for saving a token to localStorage from authenicated session
			axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
		});

export default getAccessToken;