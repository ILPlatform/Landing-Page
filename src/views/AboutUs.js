import React from 'react';

// reactstrap components
import { Container, Row, Col } from 'reactstrap';
import TeamMembers from '../components/TeamMembers';

import useData from 'data';
import { useScrollTop } from 'Helpers';

const Title = ({ title }) => (
  <h3 className="mb-4 text-center">
    <b>{title}</b>
  </h3>
);

const ColImg = ({ size, src, alt, ...props }) => (
  <Col className="mx-auto my-1" lg={size}>
    <img src={src} alt={alt} width="100%" {...props} />
    {props.extra}
  </Col>
);

const ColIcon = ({ icon, title, description }) => (
  <Col md="3">
    <div className="info">
      <div className="icon icon-danger">
        <i className={`nc-icon ${icon}`} />
      </div>
      <div className="description">
        <h4 className="info-title">{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  </Col>
);

const AboutUs = () => {
  useScrollTop();

  const data = useData('about-us')[0];

  return (
    <>
      <div className="main mt-5 pt-5">
        <Container className="text-center">
          <h1>{data.title}</h1>
          <h3>{data.subtitle}</h3>
        </Container>
        <div className="section">
          <Container>
            <Row className="align-items-center mb-4">
              <Col lg={7}>
                <Title title={data[0].title} />
                <h5>{data[0].content}</h5>
              </Col>
              <ColImg
                size={5}
                src={
                  require('../assets/img/about-us/ILPlatform_AboutUs.jpg')
                    .default
                }
                alt="ILPlatform About Us"
              />
            </Row>
          </Container>

          <div className="section section-gray ">
            <Container>
              <Row>
                <Col className="mx-auto text-center" md="8">
                  <h2 className="title">{data[1].title}</h2>
                  <h5>{data[1].content}</h5>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <ColIcon icon="nc-single-02" {...data[1].list[0]} />
                <ColIcon icon="nc-bulb-63" {...data[1].list[1]} />
                <ColIcon icon="nc-chart-bar-32" {...data[1].list[2]} />
              </Row>
              <Row className="justify-content-center">
                <ColIcon icon="nc-satisfied" {...data[1].list[3]} />
                <ColIcon icon="nc-laptop" {...data[1].list[4]} />
              </Row>
            </Container>
          </div>

          <TeamMembers />
        </div>
      </div>
    </>
  );
};

export default AboutUs;
