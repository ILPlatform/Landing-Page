import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import {useScrollTop} from 'Helpers';
import useData from 'data';
import {useParams} from "react-router-dom";
import {v4} from "uuid";

function ProgrammeSub() {
  let { id } = useParams();
  useScrollTop();
  const data = useData()?.information?.programme?.groups[id];
  
  return (<>
    <div className="wrapper mt-5 pt-5">
      <Container className="text-center">
        <h1>{data?.title}</h1>
      </Container>
      
      {/* First Section */}
      <div className="section section-light text-center">
        <Container className="text-center">
          
          <Row className="align-items-center">
            <Col className="mx-auto" xs="12" lg="8">
              <h5 className="text-left">
                {data?.content1}
              </h5>
            </Col>
            <Col className="mx-auto my-1" xs={10} md={4} style={{height: "auto"}}>
              <img src={require(`../assets/img/programme/ILPlatform_Programme${id}.png`).default}
                   alt={"ILPlatform Programme 1"}
                   width="100%" className="img-thumbnail"/>
            </Col>
          </Row>
        </Container>
      </div>
  
      {/* Second Section */}
      <div className="section section-light text-center">
        <Container className="text-center">
      
          <Row className="align-items-center">
            <Col className="mx-auto" xs="12" lg="6">
              <h3 className="title">{data?.title2}</h3>
              <h5 className="text-center">
                {/*<ul>*/}
                {data?.content2?.map(ele => <p key={v4()} className="lead">{ele}</p>)}
                {/*</ul>*/}
              </h5>
            </Col>
            <Col className="mx-auto my-1" xs={12} md={6}>
              <h3 className="title">{data?.title3}</h3>
              <h5 className="text-center">
                {data?.content3?.map(ele => <img key={v4()}
                                                 src={require(`../assets/img/programme/${ele}`).default}
                                                 alt={"ILPlatform Programme"}
                                                 width="30%"
                                                 className="m-2"
                                                 />)}
              </h5>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  </>);
}

export default ProgrammeSub;
