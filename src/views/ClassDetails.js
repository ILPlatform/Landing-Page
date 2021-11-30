import React from 'react';

// reactstrap components
import { Container, Row, Col, Button } from 'reactstrap';

// core components
import { useScrollTop } from 'Helpers';
import useData from 'data';
import { v4 } from 'uuid';

const mbStyle = {
  marginBottom: '20px',
  marginTop: '20px',
  paddingBottom: '30px',
  paddingTop: '30px',
};

function ClassDetails({ match }) {
  useScrollTop();
  const data = useData('classdetails', { id: match.params.id });

  return (
    <>
      <div className="wrapper mt-5 pt-5">
        <div className="section text-center" style={mbStyle}>
          <Container>
            <Row className="justify-content-center align-items-center">
              <Col className="text-left" lg={6} md={7}>
                <h2 className="mb-4">
                  <b>{data?.title}</b>
                </h2>
                <br />
                <h5>
                  <ul>
                    {data?.info?.map((title, i) => (
                      <li className="my-2" key={v4()}>
                        <b>{data?.info[i]}</b>{' '}
                        {data?.infoDescs && data?.infoDescs[i]}
                      </li>
                    ))}
                  </ul>
                </h5>
              </Col>
              <Col lg={4} md={5}>
                <img
                  src={data?.img}
                  alt="ILPlatform Classes"
                  className="img-thumbnail"
                />
              </Col>
            </Row>
            <br />
            <Row className="justify-content-center">
              <Col lg={10} md={12} className="text-left">
                <h2 className="text-center">
                  <b>{data?.detailsTitle}</b>
                </h2>
                <br />
                {data?.details?.map((det) => (
                  <h5 key={v4()}>{det}</h5>
                ))}
              </Col>
            </Row>
            <br />
            <br />
            <Row className="justify-content-center align-items-center">
              <Col lg={6} md={7} className="text-left">
                <h2 className="text-center">
                  <b>{data?.exampleTitle}</b>
                </h2>
                <br />
                {data?.example?.map((ex) => (
                  <h5 key={v4()}>{ex}</h5>
                ))}
              </Col>
              <Col lg={4} md={5}>
                <img
                  src={data?.exampleImg}
                  alt="ILPlatform Example Project"
                  width="100%"
                  className="img-thumbnail"
                />
              </Col>
            </Row>
            <br /> <br />
            <br /> <br />
            <Row className="justify-content-center">
              <Col lg={6} md={8} xs={10}>
                <a
                  href={`/classes/${match.params.classtype}/${match.params.id}/register`}
                >
                  <Button className="w-100 btn-round" color="success">
                    {data?.register}
                  </Button>
                </a>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ClassDetails;
