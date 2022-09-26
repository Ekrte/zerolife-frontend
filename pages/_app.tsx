import "../styles/globals.css";
import "normalize.css/normalize.css";

import type { AppProps } from "next/app";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../styles/theme";
import AuthenticatedSession from "../components/AuthenticatedSession";
import "@fontsource/noto-sans-kr";

const exceptPaths = ['/login', '/splash', '/consent', '/agreeement'];

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
	const [queryClient] = useState(() => new QueryClient());
	const currentPath = appProps.router.pathname;

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<ThemeProvider theme={defaultTheme}>
					{!exceptPaths.includes(currentPath) && <AuthenticatedSession />}
					<Component {...pageProps} />
				</ThemeProvider>
			</Hydrate>
		</QueryClientProvider>
	);
}

export default MyApp;
