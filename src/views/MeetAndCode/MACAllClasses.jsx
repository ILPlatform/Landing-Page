import React from "react";
import { Card, CardBody, CardImg, Col, Container, Row } from "reactstrap";
import { useScrollTop } from "../../Helpers";
import { v4 } from "uuid";
import DocumentMeta from "react-document-meta";
import useData from "../../data";
import { NavLink } from "react-router-dom";

function MACAllClasses() {
  const data = useData()?.meet_and_code;
  useScrollTop();

  const meta = {
    title: data?.page_title,
    description: data?.page_description,
    canonical: "https://www.ilplatform.be/meet_and_code/",
    meta: {
      property: {
        "og:title": data?.page_title,
        "twitter:title": data?.page_title,
        "og:description": data?.page_description,
        // "og:image": require("../assets/img/programme/ILPlatform_MACAllClasses.png").default,
        "og:site_name": "ILPlatform",
        "og:type": "website",
        "og:locale": "fr",
        "og:url": "https://www.ilplatform.be/meet_and_code/",
      },
    },
  };

  return (
    <DocumentMeta {...meta}>
      <div className="wrapper mt-5 pt-5">
        <Container className="text-center">
          <h1>{data?.page_title}</h1>
          <h5>{data?.page_description}</h5>
        </Container>
        <div className="section section-light text-center">
          <Container>
            <Row className="pt-2 justify-content-center">
              {data?.classes.map((classInfo) => (
                <Col lg={4} md={6} sm={12} key={v4()}>
                  <Card color="light" tag={NavLink} to={`/meet_and_code/${classInfo?.id}`}>
                    <CardImg
                      className="my-auto mx-0"
                      src={require(`../../assets/img/meet_and_code/${classInfo?.image}`).default}
                      style={{ width: "auto", height: "200px" }}
                    />
                    <CardBody className="text-center p-3">
                      <h3 className="h4 mt-1">
                        <b>{classInfo?.title}</b>
                      </h3>
                      <p className="mt-1 mb-1">
                        {classInfo?.dates}, {classInfo?.time}
                      </p>
                      <p className="mt-1 mb-1">{classInfo?.age_group}</p>
                      {/* <p className="mt-1 mb-1"></p> */}
                      <p className="mt-1 mb-1">
                        <b style={{ fontWeight: 1000 }}>{data?.free}</b>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </DocumentMeta>
  );
}

export default MACAllClasses;
