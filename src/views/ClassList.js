import React from 'react';

// reactstrap components
import { Container, Row, Col, Card, CardBody, CardImg } from 'reactstrap';

import { useScrollTop } from 'Helpers';
import useData from 'data';
import { v4 } from 'uuid';

const mbStyle = {
  marginBottom: '20px',
  marginTop: '20px',
  paddingBottom: '30px',
  paddingTop: '30px',
};

function ClassList({ match }) {
  useScrollTop();
  let data = useData('classlist', { type: match.params.classtype });

  return (
    <>
      <div className="wrapper mt-5">
        <div className="section section-light text-center" style={mbStyle}>
          <Container>
            <Row className="align-items-center">
              <Col className="mx-auto" lg="8">
                <h2 className="mb-4">
                  <b>{data?.titles[match.params.classtype]} </b>
                </h2>
                <p>{data?.any ? data?.choose : data?.none}</p>
              </Col>
            </Row>
            <br />
            <Row className="justify-content-center">
              <Col lg={10}>
                <Row className="justify-content-center">
                  {data.any &&
                    data.arrayKeys?.map((card, i) => (
                      <Col lg={4} md={6} key={v4()}>
                        <a
                          href={`/classes/${match.params.classtype}/${data.keys[card]}`}
                        >
                          <Card color="light">
                            <CardImg
                              className="my-auto mx-0"
                              src={data.img[card]}
                              style={{ width: 'auto', height: '200px' }}
                            />
                            <CardBody className="text-center p-3">
                              <h4 className="mt-1">
                                <b>{data.cardTitles[card]}</b>
                              </h4>
                              <p className="mt-1 mb-4">{data.cardDesc[card]}</p>
                              <p>
                                <b>{data.shortLoc[card]}</b>
                              </p>
                            </CardBody>
                          </Card>
                        </a>
                      </Col>
                    ))}
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ClassList;
