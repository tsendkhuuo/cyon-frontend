import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Container className="mt-5" style={{ paddingTop: "24px" }}>
        <Row>
          <Col xs={6}>
            <Card style={{ backgroundColor: "#e5e5e5" }}>
              <Card.Body>
                <Card.Title>User Profile</Card.Title>
                <a href="/userprofile">
                  <Button variant="primary">Edit Profile</Button>
                </a>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
