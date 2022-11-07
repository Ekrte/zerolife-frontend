import { useEffect, useState } from "react";
import isLoggedIn from "../hooks/isLoggedIn";
import Spinner from "./Spinner";

function AuthenticatedSession(props: any) {
	const [isLoading, setIsLoading] = useState(true);
	
	useEffect(() => {
		async function load() {
            const id = await isLoggedIn();
			console.log(id);
			if(id) setIsLoading(false);
		}
		load();
	}, []);

	return isLoading ? <Spinner /> : props.children;
}

export default AuthenticatedSession;