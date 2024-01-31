import React from "react";
import { Container, Row } from "reactstrap";
import UserInfo from "./UserInfo";
import OpeningOfLeaflets from "./OpeningOfLeaflets";
import ShiftsOverview from "./ShiftsOverview";
import ProjectsTable from "./ProjectsTable";
import CustomerTransaction from "./CustomerTransaction";
import UserNotifications from "./UserNotifications";
import UpcomingAppointments from "./UpcomingAppointments";
import ActiveMembers from "./ActiveMembers";
import SalesStatistic from "./SalesStatistic";
import SalesByProduct from "./SalesByProduct";
import UserByContinent from "./UserByContinent/page";
import TotalStudents from "../Education/TotalStudents";
import StudyStatistics from "../Education/StudyStatistics";

const DefaultDashboardContainer = () => {
  return (
    <>
    <Container fluid className="default-dashboard">
      <Row className="widget-grid">
        <UserInfo />
        <OpeningOfLeaflets />
        <ShiftsOverview />
      </Row>
    </Container>
    <Container fluid className="dashboard-4">

        {/* <ProjectsTable /> */}
        {/* <CustomerTransaction /> */}
        {/* <UserNotifications /> */}
        {/* <UpcomingAppointments /> */}
        {/* <ActiveMembers /> */}
        <Row>
<TotalStudents/>
<StudyStatistics />
        </Row>
        {/* <SalesStatistic /> */}
        {/* <SalesByProduct /> */}
    </Container>

    <Container fluid className="default-dashboard">
      <Row className="widget-grid">
     
        <SalesStatistic />
      </Row>
    </Container>
    </>
  );
};

export default DefaultDashboardContainer;
