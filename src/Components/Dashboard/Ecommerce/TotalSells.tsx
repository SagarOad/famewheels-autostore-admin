import { ImagePath } from "@/Constant";
import { TopSellData } from "@/Data/General/Dashboard/Ecommerce";
import ReactApexChart from "react-apexcharts";
import { Card, CardBody, Col } from "reactstrap";
import DashboardCommonHeader from "../common/DashboardCommonHeader";
import { AdmissionRatioChart } from "@/Data/General/Widgets/General";

interface moreTYpes {
  auctionAds:number,
  throughFamewheels:number
}

const TotalSells = ({auctionAds,throughFamewheels}:moreTYpes) => {
  return (
    <>
        <Col xl="3" sm="6" className="daily-revenue-card">
          <Card>
            <DashboardCommonHeader title={"Auction Ads"} />
            <CardBody className={`pb-0 total-sells `}>
              <div className="d-flex align-items-center gap-3">
                <div className="flex-shrink-0">
                  <img src={`${ImagePath}/dashboard-3/icon/coin1.png`} alt="icon" />
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-2">
                    <h2>{auctionAds}</h2>
                    <div className="d-flex total-icon">
                      <p className={`mb-0 up-arrow bg-light-success`}>
                        <i className={`fa fa-arrow-up text-success`} />
                      </p>
                      <span className={`f-w-500 font-success`}> 20%</span>
                    </div>
                  </div>
                  <p className="text-truncate">Than Last 6 Months</p>
                </div>
              </div>
              <ReactApexChart id={auctionAds} options={AdmissionRatioChart} series={AdmissionRatioChart.series} type="area" height={90} />
            </CardBody>
          </Card>
        </Col>

        <Col xl="3" sm="6" className="daily-revenue-card">
          <Card>
            <DashboardCommonHeader title={"Sale Through Famewheels"} />
            <CardBody className={`pb-0 total-sells-2 `}>
              <div className="d-flex align-items-center gap-3">
                <div className="flex-shrink-0">
                  <img src={`${ImagePath}/dashboard-3/icon/coin1.png`} alt="icon" />
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-2">
                    <h2>{throughFamewheels}</h2>
                    <div className="d-flex total-icon">
                      <p className={`mb-0 fa-up-arrow bg-light-success`}>
                        <i className={`fa fa-arrow-up text-success`} />
                      </p>
                      <span className={`f-w-500 font-success`}> 20%</span>
                    </div>
                  </div>
                  <p className="text-truncate">Than Last 6 Months</p>
                </div>
              </div>
              <ReactApexChart id={throughFamewheels} options={AdmissionRatioChart} series={AdmissionRatioChart.series} type="area" height={90} />
            </CardBody>
          </Card>
        </Col>

        <Col xl="3" sm="6" className="daily-revenue-card">
          <Card>
            <DashboardCommonHeader title={"New Cars"} />
            <CardBody className={`pb-0 total-sells `}>
              <div className="d-flex align-items-center gap-3">
                <div className="flex-shrink-0">
                  <img src={`${ImagePath}/dashboard-3/icon/coin1.png`} alt="icon" />
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-2">
                    <h2>{auctionAds}</h2>
                    <div className="d-flex total-icon">
                      <p className={`mb-0 up-arrow bg-light-success`}>
                        <i className={`fa fa-arrow-up text-success`} />
                      </p>
                      <span className={`f-w-500 font-success`}> 20%</span>
                    </div>
                  </div>
                  <p className="text-truncate">Than Last 6 Months</p>
                </div>
              </div>
              <ReactApexChart id={auctionAds} options={AdmissionRatioChart} series={AdmissionRatioChart.series} type="area" height={90} />
            </CardBody>
          </Card>
        </Col>

        <Col xl="3" sm="6" className="daily-revenue-card">
          <Card>
            <DashboardCommonHeader title={"Inspections"} />
            <CardBody className={`pb-0 total-sells-2 `}>
              <div className="d-flex align-items-center gap-3">
                <div className="flex-shrink-0">
                  <img src={`${ImagePath}/dashboard-3/icon/coin1.png`} alt="icon" />
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-2">
                    <h2>{throughFamewheels}</h2>
                    <div className="d-flex total-icon">
                      <p className={`mb-0 fa-up-arrow bg-light-success`}>
                        <i className={`fa fa-arrow-up text-success`} />
                      </p>
                      <span className={`f-w-500 font-success`}> 20%</span>
                    </div>
                  </div>
                  <p className="text-truncate">Than Last 6 Months</p>
                </div>
              </div>
              <ReactApexChart id={throughFamewheels} options={AdmissionRatioChart} series={AdmissionRatioChart.series} type="area" height={90} />
            </CardBody>
          </Card>
        </Col>
      
    </>
  );
};

export default TotalSells;
