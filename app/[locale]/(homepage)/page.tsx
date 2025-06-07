import { getIpInfo } from '../../../lib/actions/getIp';
import CromboDetail from './component/CromboDetail';
import CareerBlock from './component/HeaderSection';
import HomePageBody from './component/HomePageBody';

export default async function Page() {
  const ipInfo = await getIpInfo();
  console.log(ipInfo);
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 md:p-8" id="mainpage">
      <CareerBlock />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-1">
        <CromboDetail />
      </div>
      <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50 md:min-h-min max-w-full mx-auto p-2">
        <HomePageBody />
      </div>
    </div>
  );
}
