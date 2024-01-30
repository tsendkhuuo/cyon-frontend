import React from "react";
import { Navigate } from "react-router-dom";
import authStore from "../stores/authStore";
import Header from "../components/Header";
import { Button, Col, Container, Row } from "react-bootstrap";

export default function Login() {
  const s = authStore();

  if (s.loggedIn) return <Navigate to="/" />;

  return (
    <>
      <Header />
      <Container className="mt-5" style={{ paddingTop: "24px" }}>
        <Row>
          <Col xs={6}>
            {s.address === "" ? (
              <>
                <Button onClick={s.connectWallet}>Connect wallet</Button>
              </>
            ) : (
              <>
                <Button onClick={s.signin}>Sign in</Button>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
