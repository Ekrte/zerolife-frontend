import { BackHeader, StickyHeader } from "../layouts/header";
import { PageContainer } from "../layouts";
import MyRewardsSection from "../components/my-rewards/MyRewardsSection";
import { useRouter } from "next/router";

function MyRewards() {
	const router = useRouter();
	const { animate, state } = router.query;

	return (
		<PageContainer>
			<StickyHeader>
				<BackHeader
					title="내 리워드 보기"
					onBack={() => history.back()}
				/>
			</StickyHeader>
			<MyRewardsSection 
				animate={parseInt(animate as string)} 
				state={parseInt(state as string)} 
			/>
		</PageContainer>
	);
}

export default MyRewards;