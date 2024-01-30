import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { SERVER_URL } from "../utils/axios";

export default function UserProfile() {
  // let email = "";
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    getUserData();
    setLoading(false);
  }, [isLoading]);
  const handleEmailChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPhone(event.target.value);
  };

  const handleClick = () => {
    setLoading(true);
    setUserData();
    setLoading(false);
  };

  async function getUserData() {
    const userId = await sessionStorage.getItem("userId");
    const token = await sessionStorage.getItem("token");

    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: SERVER_URL + "/users/" + userId,
      headers: {
        Authorization: `JWT ${token}`,
      },
    };

    try {
      const response = await axios.request(config);

      if (response.data.email) {
        setEmail(response.data.email);
      }
      if (response.data.phone) {
        setPhone(response.data.phone);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function setUserData() {
    const userId = await sessionStorage.getItem("userId");
    const token = await sessionStorage.getItem("token");
    let data = JSON.stringify({
      email: email,
      phone: phone,
      id: userId,
    });
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: SERVER_URL + "/users/" + userId,
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      await axios.request(config);
      setIsSuccess(1);
    } catch (error) {
      setIsSuccess(2);
      console.log(error);
    }
  }
  return (
    <>
      <Header />
      <Container className="mt-5" style={{ paddingTop: "24px" }}>
        <Row>
          <Col xs={6}>
            <Card style={{ backgroundColor: "#e5e5e5" }}>
              <Card.Body>
                <Card.Title>User Profile Update</Card.Title>
                <Form>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Email: </InputGroup.Text>
                    <Form.Control
                      placeholder="Email"
                      aria-label="email"
                      aria-describedby="basic-addon1"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Phone: </InputGroup.Text>
                    <Form.Control
                      placeholder="Phone"
                      aria-label="phone"
                      aria-describedby="basic-addon1"
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={handlePhoneChange}
                    />
                  </InputGroup>
                  <Button
                    variant="primary"
                    disabled={isLoading}
                    onClick={handleClick}
                  >
                    {isLoading ? "Loading…" : "Save"}
                  </Button>{" "}
                  <Button variant="light" href="/">
                    Cancel
                  </Button>
                </Form>
                {isSuccess === 1 ? (
                  <Alert
                    key="success"
                    variant="success"
                    style={{ marginTop: 24 }}
                  >
                    Successful
                  </Alert>
                ) : isSuccess === 2 ? (
                  <Alert
                    key="danger"
                    variant="danger"
                    style={{ marginTop: 24 }}
                  >
                    Unsuccessful
                  </Alert>
                ) : (
                  <></>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
