import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import useData from 'data';
import {v4} from 'uuid';
import donors from 'data/donors.json';
import ImageWebp from "./ImageWebp";

function Partners() {
  const data = useData()?.information?.donors;
  
  return (<>
      <div className="section section-light text-center">
        <Container>
          <Row className="align-items-center">
            <Col lg={2}/>
            <Col className="mx-auto" lg={8}>
              <h2 className="h3 mb-4">
                <b>{data?.title}</b>
              </h2>
              <p className={"h5"}>{data?.content}</p>
            </Col>
            <Col lg={2}/>
          </Row>
          <br/>
          <Row className="align-items-center">
            <Col lg={1}/>
            <Col lg={10}>
              <Row className={"justify-content-center"}>
                {donors.sort(() => Math.random() - 0.5)
                  .map((donor) => (
                    <>
                    {/*<Col className="mx-auto my-1 mb-4" lg={6} md={6} sm={6} xs={12} key={v4()} data={data}>*/}
                      <a href={donor.link} style={{margin: "10px"}} target="_blank" rel="noreferrer">
                        <ImageWebp
                          srcWebp={require(`assets/img/donors/${donor.image}.webp`).default}
                          src={require(`assets/img/donors/${donor.image}.png`).default}
                          alt={donor.name}
                          className="img-thumbnail m-0 mx-auto"
                          style={{height: "100px", width: "auto"}}
                        /></a>
                      {/*<div>*/}
                      {/*  <h4 className="text-center mb-0 mt-2">{partner.name}</h4>*/}
                      {/*  /!*<small>{data?.roles[partner.role]}</small>*!/*/}
                      {/*</div>*/}
                {/*</Col>*/}
                    </>
                  ))}
              </Row>
            </Col>
            
            <Col lg={1}/>
          </Row>
        </Container>
      </div>
    </>);
}

export default Partners;
