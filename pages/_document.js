// pages/_document.js

import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet()
		const originalRenderPage = ctx.renderPage
	
		try {
		  ctx.renderPage = () =>
			originalRenderPage({
			  enhanceApp: (App) => (props) =>
				sheet.collectStyles(<App {...props} />),
			})
	
		  const initialProps = await Document.getInitialProps(ctx)
		  return {
			...initialProps,
			styles: [initialProps.styles, sheet.getStyleElement()],
		  }
		} finally {
		  sheet.seal()
		}
	}

	render() {
		return (
			<Html>
				<Head>
					{/* <link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
					<link
						href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
						rel="stylesheet"
					/> */}
					<link rel="shortcut icon" href="/icon/favicon/favicon.png" />
				</Head>
				<body className="mobile-container">
					<Main />
					<NextScript />
					<div id="modal-root"></div>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
