import React, { useEffect, useState } from "react";
import { Card, CardBody, CardImg, Col, Container, Row } from "reactstrap";
import { useScrollTop } from "../Helpers";
import useData from "../data";
import { v4 } from "uuid";
import DocumentMeta from "react-document-meta";
import { callFunction } from "../firebase";
import Loader from "../components/Loader";

const formatDate = (date) => date.split("-").reverse().join("/");

const Camps = ({ showAll = false }) => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  useScrollTop();
  const data = useData()?.information?.camps;
  const meta = {
    title: data?.page_title,
    description: data?.page_description,
    canonical: "https://www.ilplatform.be/camps/",
    meta: {
      property: {
        "og:title": data?.page_title,
        "twitter:title": data?.page_title,
        "og:description": data?.page_description,
        "og:image": require("../assets/img/programme/ILPlatform_Books.png")
          .default,
        "og:site_name": "ILPlatform",
        "og:type": "website",
        "og:locale": "fr",
        "og:url": "https://www.ilplatform.be/camps/",
      },
    },
  };

  useEffect(() => {
    callFunction("camps_e_get")().then((response) => {
      setCamps(
        response?.data?.response
          ?.filter((camp) =>
            showAll ? true : new Date(camp?.Start_Date__c) > new Date(),
          )
          ?.filter((camp) =>
            showAll
              ? true
              : new Date(camp?.Holiday__r?.Online_Date__c) <= new Date(),
          )
          ?.sort(
            (campA, campB) =>
              new Date(campA?.Start_Date__c) - new Date(campB?.Start_Date__c),
          ),
      );
      setLoading(false);
    });
  }, []);

  return (
    <DocumentMeta {...meta}>
      <div className="wrapper mt-5 pt-5">
        <Container className="text-center">
          <h1>{data?.title}</h1>
          <h5>{data?.subtitle}</h5>
        </Container>

        {/* Different Camp Weeks */}
        {loading ? (
          <Loader />
        ) : (
          <div className="section section-light text-center">
            <Container>
              <Row className="pt-2 justify-content-center">
                {camps?.map((camp) => (
                  <Col lg={3} md={4} key={v4()}>
                    <a href={`/camps/${camp?.Id}`}>
                      <Card color="light">
                        <CardImg
                          className="my-auto mx-0"
                          src={camp?.Image__c}
                          style={{ width: "auto", height: "200px" }}
                        />
                        <CardBody className="text-center p-3">
                          <h3 className="h4 mt-1">
                            <b>{camp?.Name}</b>
                          </h3>
                          <p className="mt-1 mb-1">
                            {formatDate(camp?.Start_Date__c)} -{" "}
                            {formatDate(camp?.End_Date__c)}
                            <br />({camp?.Number_of_Days__c} {data["days"]})
                          </p>
                        </CardBody>
                      </Card>
                    </a>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        )}
      </div>
    </DocumentMeta>
  );
};

export default Camps;
