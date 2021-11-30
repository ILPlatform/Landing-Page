import React, { useEffect } from 'react';

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
import { MdOutlineGppBad } from 'react-icons/md';
import useData from 'data';
import { callFunction } from 'firebase';

function RegistrationFailure({ match }) {
  useScrollTop();
  const data = useData('regFailure');
  const { uid } = match.params;
  useEffect(() => {
    callFunction('paymentFailure')({ uid });
  }, [uid]);

  return (
    <>
      <div className="wrapper mt-5 pt-5">
        <Container>
          <Row className="align-items-center">
            <Col className="mx-auto" lg="6" md="6" sm="5" xs="12">
              <Card
                className="p-4 text-center"
                style={{ backgroundColor: 'lightgray' }}
              >
                <MdOutlineGppBad size="100%" color="red" />
                <CardTitle className="mb-3" tag="h2">
                  <b>{data.title}</b>
                </CardTitle>
                <CardBody>
                  <h5>{data.try}</h5>
                </CardBody>

                <a href={`/classes/`}>
                  <Button block className="btn-round mb-3" color="default">
                    {data.again}
                  </Button>
                </a>
                <a href="/">
                  <Button block className="btn-round" color="default">
                    {data.back}
                  </Button>
                </a>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default RegistrationFailure;
