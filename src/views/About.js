import React, { useEffect } from 'react';

// reactstrap components
import { Container, Row, Col, Button } from 'reactstrap';
import TeamMembers from '../components/TeamMembers';
import DocumentMeta from 'react-document-meta';

import useData from 'data';
import { useScrollTop } from 'Helpers';
import Partners from "../components/Partners";
import { Link } from "react-router-dom";
import Donors from "../components/Donors";
import ImageWebp from "../components/ImageWebp";

const ColImg = ({ srcWebp, src, alt, ...props }) => (
  <Col className="mx-auto my-1" {...props}>
    <ImageWebp srcWebp={srcWebp} src={src} alt={alt} width="100%" />
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
        <h3 className="h4 info-title">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  </Col>
);

const About = () => {
  useScrollTop();
  const data = useData()?.information?.about;
  const meta = {
    title: data?.page_title,
    description: data?.page_description,
    canonical: 'https://www.ilplatform.be/about/',
    meta: {
      property: {
        'og:title': data?.page_title,
        'twitter:title': data?.page_title,
        'og:description': data?.page_description,
        'og:image': require(`../assets/img/about-us/ILPlatform_AboutUs.jpg`).default,
        'og:site_name': 'ILPlatform',
        'og:type': 'website',
        'og:locale': 'fr',
        'og:url': 'https://www.ilplatform.be/about/'
      }
    }
  };

  return (
    <DocumentMeta {...meta}>
      <div className="main mt-5 pt-5">
        <Container className="text-center">
          <h1>{data.title}</h1>
          <h2 className={"h3"}>{data.subtitle}</h2>
        </Container>
        <div className="section">
          <Container>
            <Row className="align-items-center mb-4">
              <Col lg={7} md={10} className="order-2 order-md-1">
                <h3 className={"text-center mb-3"}>{data[0].title}</h3>

                <p className={"h5"}>{data[0].content}</p>
              </Col>
              <ColImg
                lg={5}
                md={10}
                srcWebp={
                  require('../assets/img/about-us/ILPlatform_AboutUs.webp')
                    .default
                }
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
                  <p className="display-1 text-center">
                    <b>3000+</b>
                  </p>
                  <p className={"h5 text-center"}>{data["05"].subtitle}</p>
                  <p className="display-1 text-center">
                    <b>32</b>
                  </p>
                  <p className={"h5 text-center"}>{data["05"].subtitle2}</p>
                </Col>
                <Col lg={7} md={10} className="order-2 order-md-1">
                  <h2 className={"h3 text-center mb-3"}>{data["05"].title}</h2>
                  <p className={"h5"}>{data["05"].content}</p>
                </Col>
              </Row>
            </Container>
          </div>

          <div className="section">
            <Container>
              <Row>
                <Col className="mx-auto text-center" md="8">
                  <h2 className="h3 title">{data[1].title}</h2>
                  <p className={"h5"}>{data[1].content}</p>
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
    </DocumentMeta>
  );
};

export default About;
