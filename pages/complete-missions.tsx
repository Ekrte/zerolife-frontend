import { BackHeader, StickyHeader } from "../layouts/header";
import { PageContainer } from "../layouts";
import { useRouter } from "next/router";
import isLoggedIn from "../hooks/isLoggedIn";
import { useEffect, useState } from "react";
import CompleteMissionSection, { MissionType } from "../components/complete-missions/CompleteMissionSection";
import getCompleteMissions from "../apis/getCompleteMissions";

function CompleteMissions() {
	const router = useRouter();
	const [ missions, setMissions ] = useState<MissionType[]>([]);

	useEffect(() => {
		async function initPage() {
			try {
				await isLoggedIn();
			} finally {
				getCompleteMissions((data: any) => {
					setMissions(data)
				});
			}
		}
		initPage()
	}, []);

	return (
		<PageContainer>
			<StickyHeader>
				<BackHeader
					title="참여한 인증 보기"
					onBack={() => history.back()}
				/>
			</StickyHeader>
			<CompleteMissionSection 
				missions={missions}
			/>
		</PageContainer>
	);
}

export default CompleteMissions;
