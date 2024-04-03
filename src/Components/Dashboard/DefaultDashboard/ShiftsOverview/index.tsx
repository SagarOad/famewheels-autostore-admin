"use client";
import ReactApexChart from "react-apexcharts";
import { Card, CardBody, Col, Row } from "reactstrap";
import { ShiftsOverviewHeader } from "./ShiftsOverviewHeader";
import { ApexOptions } from "apexcharts";

interface PostTypes {
  posts: {
    allpost: number;
    approved_posts: number;
    Pending_Posts: number;
    decline_posts: number;
    sold_posts: number;
  };
}

const ShiftsOverview = ({ posts }: PostTypes) => {
  const ShiftsOptionChart: ApexOptions = {
    labels: ["Approved Posts", "pending Posts", "Declined Posts", "Sold Posts"],
    series: [30, 25, 35, 55],
    chart: {
      type: "donut",
      height: 200,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      width: 6,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "83%",
          labels: {
            show: true,
            name: {
              offsetY: 4,
            },
            total: {
              show: true,
              fontSize: "20px",
              fontFamily: "Outfit', sans-serif",
              fontWeight: 600,
              label: `${posts?.allpost}`,
              formatter: () => "Total Posts",
            },
          },
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
        },
      },
    },
    colors: ["#48A3D7", "#D77748", "#E44141", "#0da759"],
  };

  return (
    <Col xl="4" md="5" className="proorder-xl-3 proorder-md-3">
      <Card className="shifts-char-box">
        <ShiftsOverviewHeader />
        <CardBody>
          <Row>
            <Col xs="5">
              <ReactApexChart
                className="overview"
                id="shifts-overview"
                options={ShiftsOptionChart}
                series={[
                  posts?.approved_posts,
                  posts?.Pending_Posts,
                  posts?.decline_posts,
                  posts?.sold_posts,
                ]}
                height={200}
                type="donut"
              />
            </Col>
            <Col xs="7" className="shifts-overview">
              <div className="d-flex gap-2">
                <div className="flex-shrink-0">
                  <span className={`bg-warning`}> </span>
                </div>
                <div className="flex-grow-1">
                  <h6>Pending Posts</h6>
                </div>
                <span>{posts?.Pending_Posts}</span>
              </div>

              <div className="d-flex gap-2">
                <div className="flex-shrink-0">
                  <span className={`bg-secondary`}> </span>
                </div>
                <div className="flex-grow-1">
                  <h6>Approved Posts</h6>
                </div>
                <span>{posts?.approved_posts}</span>
              </div>

              <div className="d-flex gap-2">
                <div className="flex-shrink-0">
                  <span className={`bg-danger`}> </span>
                </div>
                <div className="flex-grow-1">
                  <h6>Declined Posts</h6>
                </div>
                <span>{posts?.decline_posts}</span>
              </div>

              <div className="d-flex gap-2">
                <div className="flex-shrink-0">
                  <span className={`bg-success`}> </span>
                </div>
                <div className="flex-grow-1">
                  <h6>Sold Posts</h6>
                </div>
                <span>{posts?.sold_posts}</span>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ShiftsOverview;
