import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';

import { SiGoogleclassroom } from 'react-icons/si';
import { FiCamera } from 'react-icons/fi';
import { GiCampingTent } from 'react-icons/gi';
import { useScrollTop } from 'Helpers';
import useData from 'data';

const mbStyle = {
  marginBottom: '20px',
  marginTop: '20px',
  paddingBottom: '30px',
  paddingTop: '30px',
};

const ColCardLink = ({ icon, text, href }) => (
  <Col md="3">
    <a href={href}>
      <Card color="light">
        <CardBody className="text-center">
          <div className="card-icon">{icon}</div>
          <p className="mt-1 mb-4">
            <b>{text}</b>
          </p>
        </CardBody>
      </Card>
    </a>
  </Col>
);

function ClassType() {
  useScrollTop();
  const data = useData('classtype')[0];

  return (
    <>
      <div className="wrapper mt-5">
        <div className="section section-light text-center" style={mbStyle}>
          <Container>
            <Row className="align-items-center">
              <Col className="mx-auto" lg="8">
                <h2 className="mb-4">
                  <b>{data?.title} </b>
                </h2>
                <h4>{data?.subtitle}</h4>
                <br />
                <p>{data?.desc}</p>
              </Col>
            </Row>
            <br />
            <Row className="justify-content-center">
              <ColCardLink
                text={data?.cards && data?.cards[0]}
                href="/classes/onsite/"
                icon={<SiGoogleclassroom size={48} />}
              />
              <ColCardLink
                text={data?.cards && data?.cards[1]}
                href="/classes/online/"
                icon={<FiCamera size={48} />}
              />
              <ColCardLink
                text={data?.cards && data?.cards[2]}
                href="/classes/camps"
                icon={<GiCampingTent size={48} />}
              />
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ClassType;
