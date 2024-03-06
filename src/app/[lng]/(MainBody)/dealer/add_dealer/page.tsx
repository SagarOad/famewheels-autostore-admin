"use client"
import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import DealerForm from "./DealerForm";
import  useAuth  from "@/MyHooks/useAuth";
import { Admin, User } from "@/Constant";

const NewProjectContainer = () => {
  // useAuth(User)
  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <DealerForm />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NewProjectContainer;
