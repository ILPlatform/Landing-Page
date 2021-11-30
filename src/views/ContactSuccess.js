import React from 'react';

// reactstrap components
import {
  Button,
  Card,
  CardTitle,
  Container,
  Row,
  Col,
  CardBody,
} from 'reactstrap';

import { useScrollTop } from 'Helpers';
import { GrMailOption } from 'react-icons/gr';
import useData from 'data';

function ContactSuccess() {
  useScrollTop();
  const data = useData('contact-success');

  return (
    <>
      <div className="wrapper mt-5 pt-5">
        <Container>
          <Row className="align-items-center">
            <Col className="mx-auto text-center" lg="6" md="6" sm="5" xs="12">
              <Card className="p-4" style={{ backgroundColor: 'lightgray' }}>
                <GrMailOption size="100%" color="green" />
                <CardTitle className="text-center" tag="h2">
                  <b>{data.title}</b>
                </CardTitle>
                <CardBody>
                  <h5>{data.subtitle}</h5>
                  <div className="social">
                    <h3 className="title">
                      <small>{data.social}</small>
                    </h3>
                    <div className="mx-auto">
                      <a
                        href="https://www.facebook.com/ILPlatform"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button className="btn-just-icon mr-1" color="facebook">
                          <i className="fa fa-facebook" />
                        </Button>
                      </a>

                      <a
                        href="https://www.instagram.com/ilplatform/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button
                          className="btn-just-icon mr-1"
                          color="instagram"
                        >
                          <i className="fa fa-instagram" />
                        </Button>
                      </a>
                    </div>
                  </div>

                  <a href="/">
                    <Button block className="btn-round mt-5">
                      {data.back}
                    </Button>
                  </a>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ContactSuccess;
