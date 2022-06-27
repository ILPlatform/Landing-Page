import React from 'react';
import {Button, Card, CardBody, CardTitle, Col, Container, Row,} from 'reactstrap';
import {useScrollTop} from 'Helpers';
import {MdOutlineGppGood} from 'react-icons/md';
import useData from 'data';

function RegisterSuccess() {
  useScrollTop();
  const data = useData()?.register?.success;
  
  return (
    <div className="wrapper mt-5 pt-5">
      <Container>
        <Row className="align-items-center">
          <Col className="mx-auto" lg="6" md="6" sm="5" xs="12">
            <Card
              className="p-4 text-center"
              style={{backgroundColor: 'lightgray'}}
            >
              <MdOutlineGppGood size="100%" color="green"/>
              <CardTitle className="mb-3" tag="h2">
                <b>{data?.title}</b>
              </CardTitle>
              <CardBody>
                <h5>{data?.thank}</h5>
                <h5>{data?.email_conf}</h5>
              </CardBody>
              
              <a href="/">
                <Button block className="btn-round" color="default">
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

export default RegisterSuccess;
