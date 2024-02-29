import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import DealerForm from "./DealerForm";

const NewProjectContainer = () => {
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
