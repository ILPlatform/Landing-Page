import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row, Card, CardBody, CardImg } from "reactstrap";
import { useScrollTop } from "../Helpers";
import useData from "../data";
import { v4 } from "uuid";
import ImageWebp from "../components/ImageWebp";
import DocumentMeta from "react-document-meta";

const ColImg = ({ size, srcWebp, src, alt, ...props }) => (
  <Col className="mx-auto my-1" lg={size}>
    <ImageWebp srcWebp={srcWebp} src={src} alt={alt} width="100%" {...props} />
    {props.extra}
  </Col>
);

function Shopping() {
  useScrollTop();
  const data = useData()?.information?.shopping;
  const meta = {
    title: data?.page_title,
    description: data?.page_description,
    canonical: `https://www.ilplatform.be/`,
    meta: {
      property: {
        "og:title": data?.page_title,
        "twitter:title": data?.page_title,
        "og:description": data?.page_description,
        "og:image": require("../assets/img/home/ILPlatform_Teacher.jpg").default,
        "og:site_name": "ILPlatform",
        "og:type": "website",
        "og:locale": "fr",
        "og:url": `https://www.ilplatform.be/`,
      },
    },
  };

  return (
    <DocumentMeta {...meta}>
      <div className="wrapper mt-5">
        <h1 className="pt-5 h2 text-center">{data?.title}</h1>
        {/* First Section */}
        <div className="section section-light text-center">
          <Container>
            <Row className="align-items-center">
              <ColImg
                size={4}
                srcWebp={require("../assets/img/shopping/ILPlatform_Shopping.webp").default}
                src={require("../assets/img/shopping/ILPlatform_Shopping.png").default}
                alt="ILPlatform Teacher"
                style={{ borderRadius: "16px" }}
              />
              <Col className="mx-auto px-5" lg="8">
                <h1 className="title h3 mt-0">{data[0]?.title}</h1>
                <p className="h5 text-left">{data[0]?.content1}</p>
              </Col>
            </Row>
          </Container>
        </div>
        {/* Between First and Second Section */}
        <h2 className="h3 text-center">{data?.products_title}</h2>
        <Row className="pt-4 mt-3 justify-content-center">
          {/*<Col lg={2}/>*/}

          {["0", "1"].map((id) => (
            <Col lg={3} md={4} key={v4()}>
              <a href={data["products"][id]?.link} target="_blank">
                <Card color="light">
                  <CardImg
                    className="my-auto mx-0"
                    src={require(`../assets/img/shopping/ILPlatform_Shopping${id}.png`).default}
                    style={{ width: "auto", height: "200px" }}
                  />
                  <CardBody className="text-center p-3">
                    <h3 className="h4 mt-1">
                      <b>{data["products"][id]?.title}</b>
                    </h3>
                    <p className="mt-1 mb-1">{data["products"][id]?.subtitle}</p>
                  </CardBody>
                </Card>
              </a>
            </Col>
          ))}
        </Row>
      </div>
    </DocumentMeta>
  );
}

export default Shopping;
