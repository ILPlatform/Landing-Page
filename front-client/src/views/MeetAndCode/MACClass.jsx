import React, { useState } from "react";
import useData from "data";
import { callFunction } from "firebase";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Alert, Button } from "reactstrap";
import MACDetails from "./MACDetails";
import MACRegister from "./MACRegister";

const MACClass = () => {
  const parentData = useData();
  const data = parentData?.meet_and_code;
  const { id } = useParams();
  const classInfo = data?.classes.find((cls) => cls.id === id);

  const [status, setStatus] = useState(null); // to handle the status of the request
  const [responseMessage, setResponseMessage] = useState("");
  const [formData, setFormData] = useState({
    parentFirstName: "",
    parentLastName: "",
    childFirstName: "",
    childLastName: "",
    childBirthday: "",
    parentEmail: "",
    parentPhone: "",
    comments: "",
    acceptTerms: false,
    event: id,
    language: parentData?.language,
  });

  const handleSubmit = async (e, formData) => {
    e.preventDefault();

    try {
      const response = await callFunction("front_register_for_mac")(formData);
      setStatus(response?.data?.status);
      setResponseMessage(data[response?.data?.status]);
    } catch (error) {
      setStatus(error?.response?.status);
      setResponseMessage(data[error?.data?.status]);
    }
  };

  const handleRegisterAnother = () => {
    setFormData({
      ...formData,
      childFirstName: "",
      childLastName: "",
      childBirthday: "",
      comments: "",
      acceptTerms: false,
    });
    setStatus(null);
  };

  const handleRetry = () => {
    setStatus(null);
  };

  return (
    <Container className="mt-5">
      <Row>
        <MACDetails classInfo={classInfo} data={data} />
        <Col md={4}>
          {status === 200 && (
            <div className="mb-5" style={{ position: "sticky", top: "100px" }}>
              <Alert color="success">{responseMessage}</Alert>
              <Button color="primary" className="w-100" onClick={handleRegisterAnother}>
                {data?.another}
              </Button>
            </div>
          )}
          {status === 423 && (
            <div className="mb-5" style={{ position: "sticky", top: "100px" }}>
              <Alert color="warning">{responseMessage}</Alert>
              <Button color="secondary" className="w-100" onClick={handleRetry}>
                {data?.retry}
              </Button>
            </div>
          )}
          {status === 500 && (
            <div className="mb-5" style={{ position: "sticky", top: "100px" }}>
              <Alert color="danger">{responseMessage}</Alert>
              <Button color="secondary" className="w-100" onClick={handleRetry}>
                {data?.retry}
              </Button>
            </div>
          )}
          {!status && (
            <MACRegister handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} data={data} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MACClass;
