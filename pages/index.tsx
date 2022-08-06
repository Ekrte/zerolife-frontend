import type { NextPage, GetServerSideProps  } from "next";

const Home: NextPage = () => {
	return <></>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		redirect: {
			permanent: false,
			destination: "/daily-mission"
		}
	}
  }

export default Home;