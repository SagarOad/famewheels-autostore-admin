import Image from "next/image";
import { Inter } from "next/font/google";
import PrivateRoute from "../route/PrivateRoute";
import InfoCards from "@/components/infoCards/InfoCards";
import ChartCard from "@/components/chartCards/ChartCard";
import BottomCharts from "@/components/bottomCharts/BottomCharts";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <PrivateRoute requiredRoles={["Bidder", "ROLE_ADMIN"]}>
      <main className="mt-12 xl:mt-10">
        <h1 className="font-bold px-4 text-4xl mt-2 mb-3 w-full">Dashboard</h1>
        <h4 className="px-4 w-full">
          Dashboard / <span className="text-[#ED2024]">Analysis</span>
        </h4>

        <div className="p-4">
          <InfoCards />
          <ChartCard />
          <BottomCharts />
        </div>
      </main>
    </PrivateRoute>
  );
}
