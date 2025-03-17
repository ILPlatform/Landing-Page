import React from "react";
import { Col, Container, Row, Button } from "reactstrap";
import { v4 } from "uuid";
import { useParams } from "react-router-dom";
import Dropdown from "./Dropdown";
import useData from "../data";
import { Link } from "react-router-dom";

const QA = () => {
  const data = useData()?.information?.qa;
  // let { type } = useParams();
  // const data = require(`../data/json/${type}.json`);
  // const dataT = data?.general;
  // document.title = dataT?.title;

  return (
    <div className="section section-light text-center my-0 pt-0">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <h2 className="text-center mb-4 h3">
              <b>{data?.title}</b>
            </h2>
            <p className="h5 mb-4">{data?.desc}</p>
            {data?.qas.map(({ q, a }) => (
              <Dropdown key={v4()} question={q} answer={a} />
            ))}
            <Link to="/contact">
              <Button outline className="btn-round btn-large w-50 mb-2 mt-3">
                {data?.button}
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default QA;
