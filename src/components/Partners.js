import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import useData from 'data';
import {v4} from 'uuid';
import partners from 'data/partners.json';

function Partners() {
  const data = useData()?.information?.partners;
  
  return (<>
      <div className="section section-light text-center">
        <Container>
          <Row className="align-items-center">
            <Col lg={2}/>
            <Col className="mx-auto" lg={8}>
              <h3 className="mb-4">
                <b>{data?.title}</b>
              </h3>
              <h5>{data?.content}</h5>
            </Col>
            <Col lg={2}/>
          </Row>
          <br/>
          <Row className="align-items-center">
            <Col lg={2}/>
            <Col lg={8}>
              <Row>
                {partners
                  .map((partner) => (
                    <Col className="mx-auto my-1 mb-4" lg={6} md={6} sm={6} xs={12} key={v4()} data={data}>
                      <a href={partner.link}>
                        <img
                          src={require(`assets/img/partners/${partner.image}`).default}
                          alt={partner.name}
                          className="img-thumbnail m-0 mx-auto"
                          style={{height: "150px", width: "auto"}}
                        /></a>
                      <div>
                        <h4 className="text-center mb-0 mt-2">{partner.name}</h4>
                        <small>{data?.roles[partner.role]}</small>
                      </div>
                    </Col>))}
              </Row>
            </Col>
            
            <Col lg={2}/>
          </Row>
        </Container>
      </div>
    </>);
}

export default Partners;
