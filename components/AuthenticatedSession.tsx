import { useLayoutEffect, useState } from "react";
import isLoggedIn from "../hooks/isLoggedIn";
import Spinner from "./Spinner";

function AuthenticatedSession() {
	const [isLoading, setIsLoading] = useState(true);
	
	useLayoutEffect(() => {
		async function load() {
            const id = await isLoggedIn();
			if(id) setIsLoading(false);
		}
		load();
	}, []);

	return isLoading ? <Spinner /> : <></>;
}

export default AuthenticatedSession;