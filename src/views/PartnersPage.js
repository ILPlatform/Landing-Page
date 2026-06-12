import React, { useEffect, useRef } from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { Wrapper } from "@googlemaps/react-wrapper";
import DocumentMeta from "react-document-meta";
import Partners from "../components/Partners";
import { useScrollTop } from "../Helpers";
import useData from "../data";

const googleMapsApiKey =
  process.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
  process.env.REACT_APP_GOOGLE_API_KEY ||
  process.env.REACT_APP_MAPS_API_KEY;

const MapCanvas = ({ schools }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !window.google) return;

    const map = new window.google.maps.Map(ref.current, {
      center: { lat: 50.837, lng: 4.376 },
      zoom: 11,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });

    const bounds = new window.google.maps.LatLngBounds();

    schools.forEach((school) => {
      const position = { lat: school.lat, lng: school.lng };
      const marker = new window.google.maps.Marker({
        position,
        map,
        title: school.name,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<strong>${school.name}</strong><br>${school.address}`,
      });

      marker.addListener("click", () => infoWindow.open({ anchor: marker, map }));
      bounds.extend(position);
    });

    map.fitBounds(bounds);
  }, [schools]);

  return <div ref={ref} style={{ height: "420px", width: "100%", borderRadius: "12px" }} />;
};

const PartnerMap = ({ fallback, schools }) => {
  if (!googleMapsApiKey) {
    return (
      <div className="text-center p-5 bg-light" style={{ borderRadius: "12px" }}>
        <p className="h5 mb-0">{fallback}</p>
      </div>
    );
  }

  return (
    <Wrapper apiKey={googleMapsApiKey}>
      <MapCanvas schools={schools} />
    </Wrapper>
  );
};

const InfoList = ({ title, items }) => (
  <Card className="card-plain h-100">
    <CardBody>
      <h2 className="h3 title mt-0">{title}</h2>
      <ul className="h5 text-left pl-4 mb-0">
        {items.map((item) => (
          <li className="mb-2" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </CardBody>
  </Card>
);

const OptionalSupport = ({ item }) => (
  <Col md="4">
    <div className="info">
      <div className="icon icon-danger">
        <i className={`nc-icon ${item.icon}`} />
      </div>
      <div className="description">
        <h3 className="h4 info-title">{item.title}</h3>
        <p>{item.content}</p>
      </div>
    </div>
  </Col>
);

const PartnersPage = () => {
  useScrollTop();
  const data = useData()?.partners_page;
  const schools = data?.schools?.items || [];

  const meta = {
    title: data?.page_title,
    description: data?.page_description,
    canonical: "https://www.ilplatform.be/partners/",
    meta: {
      property: {
        "og:title": data?.page_title,
        "twitter:title": data?.page_title,
        "og:description": data?.page_description,
        "og:image": require("../assets/img/programme/ILPlatform_Books.png").default,
        "og:site_name": "ILPlatform",
        "og:type": "website",
        "og:locale": "fr",
        "og:url": "https://www.ilplatform.be/partners/",
      },
    },
  };

  return (
    <DocumentMeta {...meta}>
      <div className="wrapper mt-5 pt-5">
        <Container className="text-center">
          <h1>{data?.title}</h1>
          <h2 className="h3">{data?.subtitle}</h2>
        </Container>

        <div className="section section-light">
          <Container>
            <Row className="justify-content-center">
              <Col lg={6} className="mb-4 mb-lg-0">
                <InfoList
                  title={data?.needs?.title}
                  items={data?.needs?.items || []}
                />
              </Col>
              <Col lg={6}>
                <InfoList
                  title={data?.provides?.title}
                  items={data?.provides?.items || []}
                />
              </Col>
            </Row>
          </Container>
        </div>

        <div className="section section-gray">
          <Container>
            <Row className="justify-content-center">
              <Col lg={8} className="text-center">
                <h2 className="h3 title mt-0">{data?.optional?.title}</h2>
              </Col>
            </Row>
            <Row className="justify-content-center">
              {data?.optional?.items?.map((item) => (
                <OptionalSupport item={item} key={item.title} />
              ))}
            </Row>
          </Container>
        </div>

        <div className="section section-light">
          <Container>
            <Row className="align-items-center">
              <Col lg={8}>
                <h2 className="h3 title mt-0">{data?.programme?.title}</h2>
                <p className="h5">{data?.programme?.content}</p>
              </Col>
              <Col lg={4} className="text-center text-lg-right">
                <Button className="btn-round btn-large" tag={Link} to="/programme">
                  {data?.programme?.button}
                </Button>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="section section-gray">
          <Container>
            <Row className="justify-content-center mb-4">
              <Col lg={8} className="text-center">
                <h2 className="h3 title mt-0">{data?.schools?.title}</h2>
                <p className="h5">{data?.schools?.content}</p>
              </Col>
            </Row>
            <Row>
              <Col lg={8} className="mb-4 mb-lg-0">
                <PartnerMap fallback={data?.schools?.map_fallback} schools={schools} />
              </Col>
              <Col lg={4}>
                {schools.map((school) => (
                  <div className="mb-4" key={school.name}>
                    <h3 className="h5 mb-1">
                      <b>{school.name}</b>
                    </h3>
                    <p className="mb-0">{school.address}</p>
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
        </div>

        <div className="section section-light">
          <Container>
            <Row className="justify-content-center mb-4">
              <Col lg={8} className="text-center">
                <h2 className="h3 title mt-0">{data?.testimonials?.title}</h2>
              </Col>
            </Row>
            <Row className="justify-content-center">
              {data?.testimonials?.items?.map((testimonial) => (
                <Col lg={8} key={testimonial.quote}>
                  <Card className="card-plain text-center">
                    <CardBody>
                      <p className="h5" style={{ whiteSpace: "pre-line" }}>
                        “{testimonial.quote}”
                      </p>
                      <p className="mb-0">
                        <b>{testimonial.author}</b>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>

        <Partners />
      </div>
    </DocumentMeta>
  );
};

export default PartnersPage;
