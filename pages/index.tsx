import type { NextPage } from "next";

const Home: NextPage = () => {
	return <></>;
};

export async function getServerSideProps(context) {
	return {
		redirect: {
			permanent: false,
			destination: "/daily-mission"
		}
	}
  }

export default Home;