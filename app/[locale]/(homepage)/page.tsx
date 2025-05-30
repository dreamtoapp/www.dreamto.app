import HomePageBody from "./component/HomePageBody";
import CromboDetail from "./component/CromboDetail";
import CareerBlock from "./component/HeaderSection";
import { getIpInfo } from "../../../lib/actions/getIp";
import { WavyPaths } from "../../../components/WavyPaths";

export default async function Page() {
  const ipInfo = await getIpInfo();
  console.log(ipInfo);
  return (
    <div className="flex  flex-col gap-4   " id="mainpage">
      <CareerBlock />
      <WavyPaths />
      <div className="grid  gap-4 grid-cols-1 md:grid-cols-1 p-2 ">
        <CromboDetail />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min max-w-4xl mx-auto p-2">
        <HomePageBody />
      </div>
    </div>
  );
}
