import React, {useEffect} from 'react';
import { Card, CardBody, Container, Row, Col } from 'reactstrap';
import { FaHome } from 'react-icons/fa';
import { SiGoogleclassroom } from 'react-icons/si';
import { MdPermContactCalendar } from 'react-icons/md';
import { useScrollTop } from 'Helpers';
import useData from 'data';

const ColCardLink = ({ icon, text, href }) => (
  <Col md="3">
    <a href={href}>
      <Card className="card-just-text" color="light">
        <CardBody className="text-center">
          <div className="card-icon">{icon}</div>
          <p className="card-description">
            <b>{text}</b>
          </p>
        </CardBody>
      </Card>
    </a>
  </Col>
);

function NotFound() {
  useScrollTop();
  const data = useData()?.information['404'];
  useEffect(() => {
    document.title = data?.page_title;
  }, []);
  
  return (
    <>
      <div className="filter mb-5 pt-5 text-center" />
      <Container>
        <h1 class="title text-center pt-5 display-1">
          <b>404</b>
          <br />
          <p class="error-msg">
            {data['not-found']} <a href="/contact-us/">{data['contact-us']}</a>
          </p>
        </h1>
        <h5 className="discover-pages text-center">{data['discover']}:</h5>
        <br />
        <br />
        <Row className="justify-content-center">
          <ColCardLink
            text={data['home']}
            href="/"
            icon={<FaHome size={48} />}
          />
          <ColCardLink
            text={data['classes']}
            href="https://stageo.ilplatform.be/"
            icon={<SiGoogleclassroom size={48} />}
          />
          <ColCardLink
            text={data['contact']}
            href="/contact"
            icon={<MdPermContactCalendar size={48} />}
          />
        </Row>
        <br />
      </Container>
    </>
  );
}

export default NotFound;
