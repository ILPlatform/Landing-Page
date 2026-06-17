import React, { useEffect, useRef } from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { Wrapper } from "@googlemaps/react-wrapper";
import DocumentMeta from "react-document-meta";
import Partners from "../components/Partners";
import { useScrollTop } from "../Helpers";
import useData from "../data";
import ImageWebp from "../components/ImageWebp";

const googleMapsApiKey =
  process.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
  process.env.REACT_APP_GOOGLE_API_KEY ||
  process.env.REACT_APP_MAPS_API_KEY;

const cityCoordinates = {
  Anderlecht: { lat: 50.8366, lng: 4.3078 },
  Bruxelles: { lat: 50.8503, lng: 4.3517 },
  Brugelette: { lat: 50.5954, lng: 3.8539 },
  Enghien: { lat: 50.6926, lng: 4.0415 },
  Etterbeek: { lat: 50.8369, lng: 4.3895 },
  Evere: { lat: 50.872, lng: 4.403 },
  Forest: { lat: 50.8117, lng: 4.3185 },
  Ixelles: { lat: 50.8333, lng: 4.3667 },
  Jette: { lat: 50.8778, lng: 4.324 },
  Kraainem: { lat: 50.8616, lng: 4.4695 },
  Schaerbeek: { lat: 50.8676, lng: 4.3737 },
  Uccle: { lat: 50.8018, lng: 4.3372 },
  "Watermael-Boitsfort": { lat: 50.7994, lng: 4.415 },
  Wavre: { lat: 50.7167, lng: 4.6167 },
  "Wezembeek-Oppem": { lat: 50.8395, lng: 4.4943 },
  "Woluwe-Saint-Lambert": { lat: 50.8439, lng: 4.4256 },
  "Woluwe-Saint-Pierre": { lat: 50.8293, lng: 4.4486 },
};

const getSchoolPosition = (school, index) => {
  if (typeof school.lat === "number" && typeof school.lng === "number") {
    return { lat: school.lat, lng: school.lng };
  }

  const base = cityCoordinates[school.city] || cityCoordinates.Bruxelles;
  const angle = index * 2.399963229728653;
  const radius = 0.004 + (index % 4) * 0.0017;

  return {
    lat: base.lat + Math.sin(angle) * radius,
    lng: base.lng + Math.cos(angle) * radius,
  };
};

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
    let markersCount = 0;

    const addMarker = (school, position) => {
      const marker = new window.google.maps.Marker({
        position,
        map,
        title: school.name,
      });

      const infoContent = document.createElement("div");
      const title = document.createElement("strong");
      title.textContent = school.name;
      infoContent.appendChild(title);

      if (school.city) {
        infoContent.appendChild(document.createElement("br"));
        infoContent.appendChild(document.createTextNode(school.city));
      }

      const infoWindow = new window.google.maps.InfoWindow({
        content: infoContent,
      });

      marker.addListener("click", () => infoWindow.open({ anchor: marker, map }));
      bounds.extend(position);
      markersCount += 1;
    };

    schools.forEach((school, index) => {
      addMarker(school, getSchoolPosition(school, index));
    });

    if (markersCount > 1) {
      map.fitBounds(bounds);
    }
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
              <Col lg={4} className="mb-4 mb-lg-0">
                <InfoList
                  title={data?.offers?.title}
                  items={data?.offers?.items || []}
                />
              </Col>
              <Col lg={4} className="mb-4 mb-lg-0">
                <InfoList
                  title={data?.needs?.title}
                  items={data?.needs?.items || []}
                />
              </Col>
              <Col lg={4}>
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
                <p className="h5">{data?.optional?.content}</p>
              </Col>
            </Row>
            <Row className="justify-content-center">
              {data?.optional?.items?.map((item) => (
                <OptionalSupport item={item} key={item.title} />
              ))}
            </Row>
          </Container>
        </div>

        <div className="section section-light text-center">
          <Container>
            <Row className="align-items-center">
              <Col lg={2} />
              <Col className="mx-auto" lg={5}>
                <h2 className="h3 title">{data?.programme?.title}</h2>
                <p className="h5">{data?.programme?.content}</p>
              </Col>
              <Col className="mx-auto text-center" lg={3}>
                <ImageWebp
                  className="w-100 mb-4"
                  srcWebp={
                    require("../assets/img/home/ILPlatform_Computer2.webp")
                      .default
                  }
                  src={
                    require("../assets/img/home/ILPlatform_Computer2.png")
                      .default
                  }
                  alt="ILPlatform Computer"
                />
                <Button className="btn-round w-100" tag={Link} to="/programme">
                  {data?.programme?.button}
                </Button>
              </Col>
              <Col lg={2} />
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
              <Col>
                <PartnerMap fallback={data?.schools?.map_fallback} schools={schools} />
              </Col>
            </Row>
          </Container>
        </div>

        <Partners />
      </div>
    </DocumentMeta>
  );
};

export default PartnersPage;
