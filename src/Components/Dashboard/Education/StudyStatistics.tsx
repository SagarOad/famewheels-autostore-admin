"use client";
import { Card, CardBody, Col } from "reactstrap";
import { Illustrations, StudyStatistic, UXDesign } from "@/Constant";
import ReactApexChart from "react-apexcharts";
import DashboardCommonHeader from "../common/DashboardCommonHeader";
import { StudyStatisticChart } from "@/Data/General/Dashboard/Education";
import { ApexOptions } from "apexcharts";

const StudyStatistics = ({ freeAds, featuredAds, months }) => {
  const primary = "#7A70BA";
  const secondary = "#48A3D7";

  const monthNames = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
  };
  const formattedMonthlyUsers = months.map((month) => {
    const [year, monthNum] = month.split("-");
    return `${monthNames[monthNum]}`;
  });

  console.log(formattedMonthlyUsers);

  const StudyStatisticChart: ApexOptions = {
    series: [
      {
        name: "series1",
        data: freeAds,
      },
      {
        name: "series2",
        data: featuredAds,
      },
    ],
    chart: {
      height: 230,
      type: "area",
      offsetY: 12,
      offsetX: -15,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: [primary, secondary],

    stroke: {
      curve: "smooth",
      width: 2,
    },
    grid: {
      show: true,
      strokeDashArray: 5,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [5, 100, 100, 100],
      },
    },
    annotations: {
      xaxis: [
        {
          x: 312,
          strokeDashArray: 5,
          borderWidth: 3,
          borderColor: primary,
        },
      ],
      points: [
        {
          x: 312,
          y: 4.5,
          marker: {
            size: 8,
            fillColor: primary,
            strokeColor: "#ffffff",
            strokeWidth: 4,
            radius: 5,
          },
          label: {
            borderWidth: 1,
            offsetY: 0,
            text: "7h a week on average in Apr",
            style: {
              fontSize: "14px",
              fontWeight: "600",
              fontFamily: "Outfit, sans-serif",
            },
          },
        },
      ],
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Outfit, sans-serif",
          fontWeight: 500,
          colors: "#3D434A",
        },

        formatter: (value) => {
          return `${value}h`;
        },
      },
    },
    xaxis: {
      type: "category",
      categories: formattedMonthlyUsers,
      tickAmount: 12,
      labels: {
        minHeight: undefined,
        maxHeight: 28,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontFamily: "Outfit, sans-serif",
          fontWeight: 500,
          colors: "#8D8D8D",
        },
      },
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return `<div class="apex-tooltip"> 
                    <span>
                         <span class="bg-secondary"> </span>
                          Selling : ${series[0][dataPointIndex]} K
                    </span> 
                    <span class="mt-2">
                         <span class="bg-primary"> </span>
                          Selling : ${series[1][dataPointIndex]} K
                    </span> 
                  </div>`;
      },
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 1657,
        options: {
          chart: {
            height: 190,
          },
        },
      },
    ],
  };

  return (
    <Col xl="12" md="12" className="proorder-md-2">
      <Card>
        <DashboardCommonHeader title={"Ad Statistics"} />
        <CardBody>
          <div className="studay-statistics">
            <ul className="d-flex align-item-center gap-2 simple-list flex-row">
              <li>
                <span className="bg-primary"> </span>
                {UXDesign}
              </li>
              <li>
                <span className="bg-secondary"> </span>
                {Illustrations}
              </li>
            </ul>
          </div>
          <ReactApexChart
            id="study-statistics"
            options={StudyStatisticChart}
            series={StudyStatisticChart.series}
            type="area"
            height={230}
          />
        </CardBody>
      </Card>
    </Col>
  );
};

export default StudyStatistics;
