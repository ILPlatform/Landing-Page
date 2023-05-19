import React, {useEffect} from 'react';
import {Card, CardBody, CardImg, Col, Container, Row} from 'reactstrap';
import {useScrollTop} from 'Helpers';
import useData from 'data';
import Tools from "../components/Tools";
import {v4} from "uuid";

function Programme() {
  useScrollTop();
  const data = useData()?.information?.programme;
  useEffect(() => {
    document.title = data?.page_title;
  }, []);
  
  return (<>
    <div className="wrapper mt-5 pt-5">
      <Container className="text-center">
        <h1>{data?.title}</h1>
      </Container>
      {/* First Section */}
      <div className="section section-light text-center">
        <Container>
          <Row className="align-items-center">
            <Col className="mx-auto" lg="9">
              {/*<h3 className="title">{data[0]?.title}</h3>*/}
              <h5 className="text-left">
                {data[0]?.content1}
                <br/>
                <br/>
                {data[0]?.content2}
                <br/>
                <br/>
                {data[0]?.content3}
              </h5>
            </Col>
            <Col className="mx-auto my-1 d-none d-md-inline" lg={2} md={3} style={{height: "auto"}}>
              <img src={require('../assets/img/programme/ILPlatform_Books.png').default}
                   alt={"ILPlatform Books"}
                   height="auto"
                   className="img-thumbnail"/>
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* Second Section */}
      <div className="section section-gray text-center">
        <Container>
          <Row className="align-items-center">
            <Col className="mx-auto my-1 d-none d-md-inline" lg={3} md={4} style={{height: "auto"}}>
              <img src={require('../assets/img/programme/ILPlatform_Project.png').default}
                   alt={"ILPlatform Books"}
                   width="100%"/>
            </Col>
            <Col className="mx-auto" lg="9">
              <h3 className="title mt-0">{data[1]?.title}</h3>
              <h5 className="text-left">
                {data[1]?.content}
              </h5>
            </Col>
          </Row>
        </Container>
      </div>
      
      {/*  Third Section - Tools */}
      <Tools/>
      
      {/* Fourth Section - Age Groups */}
      <div className="section section-gray text-center">
        <Container>
          <Row className="align-items-center">
            <Col className="mx-auto" lg="9">
              <h3 className="title mt-0">{data[2]?.title}</h3>
              <h5>
                {data[2]?.content}
              </h5>
            </Col>
          
          </Row>
          <Row className="pt-4 justify-content-center">
            {/*<Col lg={2}/>*/}
            
            {["1", "2", "3"].map(age_group => (<Col lg={3} md={4} key={v4()}>
              <a href={`/programme/${age_group}`}>
                <Card color="light">
                  <CardImg
                    className="my-auto mx-0"
                    src={require(`assets/img/programme/ILPlatform_Programme${age_group}.png`).default}
                    style={{width: 'auto', height: '200px'}}
                  />
                  <CardBody className="text-center p-3">
                    <h4 className="mt-1">
                      <b>
                        {data["2"][age_group]?.title}
                      </b>
                    </h4>
                    <p className="mt-1 mb-1">
                      {data["2"][age_group]?.subtitle}
                    </p>
                  </CardBody>
                </Card>
              </a>
            </Col>))}
          </Row>
        </Container>
      </div>
    </div>
  </>);
}

export default Programme;
