import axios from "axios";

const dummyJwtToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJuaWNrbmFtZSI6InRlc3QwMDQiLCJpZCI6NCwiZW1haWwiOiJ0ZXN0MDA0QGdtYWlsLmNvbSIsImlzcyI6Inplcm9saWZlIiwiZXhwIjoxNjU5OTc3MTM4fQ.c1OlWSQgk9NNeWU_WPL85Yvbq0KInt-349OBP24n5M2h-6ENBr4VDmt8Y46vch5BMWrUJRXtwa1sgOTDl2QoJw';

const isLoggedIn = () => {
	if (typeof window === 'undefined') return "";
	const user = localStorage.getItem('user');
	const BACKEND_URL = "http://118.67.128.237";

	// axios
	// 	.post(`${BACKEND_URL}/apis/users`, 
	// 		{ 
	// 			email: "testUser231d@naver.com", 
	// 			nickname: "testtestAdmin",
	// 			password: "a123123123",
	// 			marketingAgreement: true
	// 		})
	// 	.then((response: any) => console.log(response.data))
	// 	.catch((err) => {
	// 		console.error(err);
	// 	})
	// axios
	// 	.post(`http://118.67.128.237/apis/auth/token`, 
	// 		{ 
	// 			email: "test004@gmail.com", 
	// 			password: "abc123123",
	// 		})
	// 	.then((response: any) => console.log(response.data))
	// 	.catch((err) => {
	// 		console.error(err);
	// 	})
	
	// if(user) {
	// 	const { id, jwtToken } = JSON.parse(user);
	// 	axios.defaults.headers.common['Authorization'] = jwtToken;
	// 	axios.defaults.headers.common['Authorization'] = dummyJwtToken;
	// 	return id;
	// } else {
	// 	return axios
	// 	.get<{ id: string, jwtToken: string }>('/auth')
	// 	.then(res => {
	// 		localStorage.setItem('user', JSON.stringify(res.data)); // for saving a token to localStorage from authenicated session
	// 		// axios.defaults.headers.common['Authorization'] = res.data.jwtToken;
	// 		axios.defaults.headers.common['Authorization'] = dummyJwtToken;
	// 		return res.data.id;
	// 	})
	// 	.catch(err => {
	// 		location.assign('/splash'); // go to login page
	// 	})
	// }
	axios.defaults.headers.common['Authorization'] = dummyJwtToken;
}

export default isLoggedIn;