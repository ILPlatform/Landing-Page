import React from 'react';

import { Container, Row, Col, Button } from 'reactstrap';

import { useScrollTop } from 'Helpers';
import useData from 'data';

const mbStyle = {
  marginBottom: '20px',
  marginTop: '20px',
  paddingBottom: '30px',
  paddingTop: '30px',
};

function ClassListOnline() {
  useScrollTop();
  let data = useData('classlist')[0];

  return (
    <>
      <div className="wrapper mt-5">
        <div className="section section-light text-center" style={mbStyle}>
          <Container>
            <Row className="align-items-center">
              <Col className="mx-auto" lg="8">
                <h2 className="mb-4">
                  <b>{data?.titles['online']} </b>
                </h2>
                <p>{data?.private}</p>
              </Col>
            </Row>
            <br />
            <a href="/contact-us/">
              <Button className="btn-round w-50">Contact Us</Button>{' '}
            </a>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ClassListOnline;
