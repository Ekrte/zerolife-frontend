import axios from "axios";

const checkNewRewords = () => 
	axios
		.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/apis/achieved-rewards/new`)
		.then(response => response.data)
		.catch((err) => {
			if(!err?.response?.data) return;
			const { error } = err.response.data;
			alert(error.message)
		})

export default checkNewRewords;