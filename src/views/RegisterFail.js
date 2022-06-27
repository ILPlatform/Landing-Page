import React from 'react';
import {Button, Card, CardBody, CardTitle, Col, Container, Row,} from 'reactstrap';
import {useScrollTop} from 'Helpers';
import {MdOutlineGppBad} from 'react-icons/md';
import useData from 'data';

function RegisterFail() {
  useScrollTop();
  const data = useData()?.register?.fail;
  
  return (
    <div className="wrapper mt-5 pt-5">
      <Container>
        <Row className="align-items-center">
          <Col className="mx-auto" lg="6" md="6" sm="5" xs="12">
            <Card
              className="p-4 text-center"
              style={{backgroundColor: 'lightgray'}}
            >
              <MdOutlineGppBad size="100%" color="red"/>
              <CardTitle className="mb-3" tag="h2">
                {data?.title}
              </CardTitle>
              <CardBody>
                <h5>{data?.try}</h5>
              </CardBody>
              
              <a href={`/classes/`}>
                <Button block className="btn-round mb-3" color="primary">
                  {data?.again}
                </Button>
              </a>
              <a href="/">
                <Button block className="btn-round" color="primary">
                  {data?.back}
                </Button>
              </a>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RegisterFail;
