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
import TotalSells from "../Ecommerce/TotalSells";
import MonthlyAttendance from "../Education/MonthlyAttendance";
import TopSeller from "../Ecommerce/TopSeller/TopSeller";
import RecentProjects from "../Project/RecentProjects";
import ProjectStatus from "../Project/ProjectStatus";
import TotalProject from "../Project/TotalProject";
import ProjectsOverview from "../Project/ProjectsOverview";
import ClientActivity from "../Project/ClientActivity";
import WebsiteDesign from "../Project/WebsiteDesign";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "@/app/loading";
import TotalFeaturedAds from "../Education/TotalFeaturedAds";
import FeaturedAdsStatistics from "../Education/FeaturedAdsStatistics";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const DefaultDashboardContainer = () => {
  const token = localStorage.getItem("authToken");

const adminDahsboardCounts = async ()=>{

  try {
    const response = await axios.get(`${BASE_URL}/admindashboardcounts`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    console.log(error)
  }
}

  const {
    data: dashboardCounts,
    error,
    isLoading,
  } = useQuery(
    `dashboard_counts`,
    adminDahsboardCounts
  );


  console.log("dashboardCounts ====== " , dashboardCounts)

  return (
    <>

{
  isLoading ? 
  <Loading/>
  : <>
  
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
          <OpeningOfLeaflets allUsers={dashboardCounts?.allusers}/>
          <ShiftsOverview allPosts={dashboardCounts?.allpost} appRovedPosts={dashboardCounts?.approved_posts} pendingPosts={dashboardCounts?.Pending_Posts} declinedPosts={dashboardCounts?.Pending_Posts} soldPosts={dashboardCounts?.Pending_Posts} />
        </Row>
      </Container>


      <Container fluid className="dashboard-4">
        <Row>
          <TotalStudents freeAdsAll={dashboardCounts?.freeadds_all} freeAdspending={dashboardCounts?.freeadds_pending} freeAdsActive={dashboardCounts?.freeadds_active} freeAdsReject={dashboardCounts?.freeadds_rejected} freeAdsSold={dashboardCounts?.freeadds_sold}/>
          <StudyStatistics />
        </Row>

        <Row>
          <FeaturedAdsStatistics />
          <TotalFeaturedAds featuredAdsAll={dashboardCounts?.featured_all} featuredAdspending={dashboardCounts?.featured_pending} featuredAdsActive={dashboardCounts?.featured_active} featuredAdsReject={dashboardCounts?.featured_rejected} featuredAdsSold={dashboardCounts.featured_sold}/>
        </Row>
      </Container>


      <Container fluid className="default-dashboard">
        <Row>
          <TotalSells auctionAds={dashboardCounts?.auction_adds} throughFamewheels={dashboardCounts?.through_famewheels}/>
        </Row>
      </Container>
      <Container fluid className="default-dashboard">
        <Row className="widget-grid">
          <SalesStatistic />
        </Row>
      </Container>

      <Container fluid className="dashboard-2">
        <Row>
          <ProjectStatus />
          <RecentProjects />
          <TotalProject />
          <WebsiteDesign />
          <ProjectsOverview />
          <ClientActivity />
        </Row>
      </Container>
    
      </>
}
    </>
  );
};

export default DefaultDashboardContainer;
