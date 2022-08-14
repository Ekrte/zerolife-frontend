import { BackHeader, StickyHeader } from "../layouts/header";
import { PageContainer } from "../layouts";
import { useRouter } from "next/router";
import isLoggedIn from "../hooks/isLoggedIn";
import { useEffect, useState } from "react";
import CompleteMissionSection, { MissionType } from "../components/complete-missions/CompleteMissionSection";
import getCompleteMissions from "../apis/getCompleteMissions";

function CompleteMissions() {
	isLoggedIn();
	const [ missions, setMissions ] = useState<MissionType[]>([]);

	useEffect(() => {
		getCompleteMissions((data: any) => {
			setMissions(data)
		});
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
