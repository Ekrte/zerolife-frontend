import { BackHeader, StickyHeader } from "../layouts/header";
import { PageContainer } from "../layouts";
import MyRewardsSection from "../components/my-rewards/MyRewardsSection";
import { useRouter } from "next/router";
import isLoggedIn from "../hooks/isLoggedIn";
import { useEffect } from "react";

function MyRewards() {
	useEffect(() => {
		async function initPage() {
			try {
				await isLoggedIn();
			} finally {}
		}
		initPage()
	}, []);
	const router = useRouter();
	const { animate, state } = router.query;

	return (
		<PageContainer>
			<StickyHeader>
				<BackHeader
					title="내 리워드 보기"
					onBack={() => location.assign('/my-page')}
				/>
			</StickyHeader>
			<MyRewardsSection animate={parseInt(animate as string)} state={parseInt(state as string)} />
		</PageContainer>
	);
}

export default MyRewards;
