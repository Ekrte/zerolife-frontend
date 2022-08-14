import axios from "axios";

const getAccessToken = async (email: string, password: string) => 
	await axios
		.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/apis/auth/token`,
			{ 
				email: email, 
				password: password,
			})
		.then((response: any) => {
			console.log(response.data.accessToken);
			localStorage.setItem('user', JSON.stringify(response.data)); // for saving a token to localStorage from authenicated session
			axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
		})
		.catch((err) => {
			console.error(err);
		})

export default getAccessToken;