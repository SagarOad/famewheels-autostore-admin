"use client"
import { ShiftsOptionChart, ShiftsOverviewData } from "@/Data/General/Dashboard/DefaultDashboard";
import ReactApexChart from "react-apexcharts";
import { Card, CardBody, Col, Row } from "reactstrap";
import { ShiftsOverviewHeader } from "./ShiftsOverviewHeader";

interface PostTypes {
  allPosts:number,
  appRovedPosts:number,
  pendingPosts:number,
  declinedPosts:number,
  soldPosts:number
}

const ShiftsOverview = ({allPosts,appRovedPosts,pendingPosts,declinedPosts,soldPosts}:PostTypes) => {
  return (
    <Col xl="4" md="5" className="proorder-xl-3 proorder-md-3">
      <Card className="shifts-char-box">
        <ShiftsOverviewHeader />
        <CardBody>
          <Row>
            <Col xs="5">
              <ReactApexChart className="overview" id="shifts-overview" options={ShiftsOptionChart} series={[allPosts,appRovedPosts,pendingPosts,declinedPosts,soldPosts]} height={200} type="donut" />
            </Col>
            <Col xs="7" className="shifts-overview">
                <div className="d-flex gap-2">
                  <div className="flex-shrink-0">
                    <span className={`bg-primary`}> </span>
                  </div>
                  <div className="flex-grow-1">
                    <h6>All Posts</h6>
                  </div>
                  <span>{allPosts}</span>
                </div>

                <div className="d-flex gap-2">
                  <div className="flex-shrink-0">
                    <span className={`bg-warning`}> </span>
                  </div>
                  <div className="flex-grow-1">
                    <h6>Pending Posts</h6>
                  </div>
                  <span>{pendingPosts}</span>
                </div>

                <div className="d-flex gap-2">
                  <div className="flex-shrink-0">
                    <span className={`bg-secondary`}> </span>
                  </div>
                  <div className="flex-grow-1">
                    <h6>Approved Posts</h6>
                  </div>
                  <span>{appRovedPosts}</span>
                </div>      

                <div className="d-flex gap-2">
                  <div className="flex-shrink-0">
                    <span className={`bg-danger`}> </span>
                  </div>
                  <div className="flex-grow-1">
                    <h6>Declined Posts</h6>
                  </div>
                  <span>{declinedPosts}</span>
                </div>

                <div className="d-flex gap-2">
                  <div className="flex-shrink-0">
                    <span className={`bg-tertiary`}> </span>
                  </div>
                  <div className="flex-grow-1">
                    <h6>Sold Posts</h6>
                  </div>
                  <span>{soldPosts}</span>
                </div>

            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ShiftsOverview;
