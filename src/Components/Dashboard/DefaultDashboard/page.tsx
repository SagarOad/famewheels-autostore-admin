"use client";

import React, { useState } from "react";
import { Card, Col, Container, Input, Row } from "reactstrap";
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
        <Card className="profile-greeting p-2">
          <Row className="widget-grid">
            <Col xxl="10" md="5" className="proorder-xl-3 proorder-md-3"></Col>
            <Col xxl="2" className="box-col-12 proorder-xl-8 proorder-md-9">
              <Input className="digits" type="month" defaultValue="2023-01" />
            </Col>
          </Row>
        </Card>
      </Container>
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
          <TotalStudents />
          <StudyStatistics />
        </Row>
        {/* <SalesByProduct /> */}
      </Container>

      <Container fluid className="default-dashboard">
        <Row className="widget-grid">
          <SalesStatistic />
        </Row>
      </Container>
      <Container fluid className="dashboard-4">
        <ProjectsTable />
        <CustomerTransaction />
        <UserNotifications />
        <UpcomingAppointments />
        <ActiveMembers />

        <SalesByProduct />
      </Container>
    </>
  );
};

export default DefaultDashboardContainer;
