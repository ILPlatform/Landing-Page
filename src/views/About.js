import React, {useEffect} from 'react';

// reactstrap components
import {Container, Row, Col, Button} from 'reactstrap';
import TeamMembers from '../components/TeamMembers';

import useData from 'data';
import { useScrollTop } from 'Helpers';
import Partners from "../components/Partners";
import {Link} from "react-router-dom";
import Donors from "../components/Donors";

const Title = ({ title }) => (
  <h3 className="mb-4 text-center">
    <b>{title}</b>
  </h3>
);

const ColImg = ({ src, alt, ...props }) => (
  <Col className="mx-auto my-1" {...props}>
    <img src={src} alt={alt} width="100%" />
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

const About = () => {
  useScrollTop();
  const data = useData()?.information?.about;
  useEffect(() => {
    document.title = data?.page_title;
  }, []);
  
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
              <Col lg={7} md={10} className="order-2 order-md-1">
                <Title title={data[0].title} />
                <h5>{data[0].content}</h5>
              </Col>
              <ColImg
                lg={5}
                md={10}
                src={
                  require('../assets/img/about-us/ILPlatform_AboutUs.jpg')
                    .default
                }
                alt="ILPlatform About Us"
                className="order-1 order-md-2"
              />
            </Row>
          </Container>
  
          <div className="section section-gray">
          <Container>
            <Row className="align-items-center mb-4">
              <Col lg={5} md={10} className="order-2 order-md-1">
                <h1 className="display-1 text-center">
                  <b>2000+</b>
                </h1>
                <h5 className={"text-center"}>{data["05"].subtitle}</h5>
                <h1 className="display-1 text-center">
                  <b>16</b>
                </h1>
                <h5 className={"text-center"}>{data["05"].subtitle2}</h5>
              </Col>
              <Col lg={7} md={10} className="order-2 order-md-1">
                <Title title={data["05"].title} />
                <h5>{data["05"].content}</h5>
              </Col>
            </Row>
          </Container>
          </div>

          <div className="section">
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
          <Partners />
          <Donors />
          <TeamMembers />
        </div>
      </div>
    </>
  );
};

export default About;
