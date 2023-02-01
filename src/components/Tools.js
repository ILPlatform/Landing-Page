import React from 'react';
import {Button, Col, Container, Row} from 'reactstrap';
import useData from 'data';
import {Link} from "react-router-dom";

const ColImg = ({size, src, alt, ...props}) => (<Col className="mx-auto my-1" lg={size}>
    <img src={src} alt={alt} width="100%" {...props} />
    {props.extra}
  </Col>);

const ColTool = ({name, lg = false, style}) => (<Col className="mb-4">
    <img
      src={require(`../assets/img/home/Tools/${name}.png`).default}
      alt={name}
      style={{...style, height: "90px", width: "auto"}}
    />
  </Col>);

function Tools({button=false}) {
  const data = useData()?.information?.tools;
  
  return (<div className="section section-light text-center">
    <Container>
      <Row className="align-items-center">
        <Col className="mx-auto" lg="10">
          <h3 className="title">{data?.title}</h3>
          <h5>{data?.content}</h5>
          {/*<h5>{data[6]?.content}</h5>*/}
        </Col>
        {/*<ColImg*/}
        {/*  size={4}*/}
        {/*  src={require('../assets/img/home/ILPlatform_Books.jpg').default}*/}
        {/*  alt="ILPlatform Books"*/}
        {/*  className="d-none d-lg-block"*/}
        {/*/>*/}
      </Row>
      <Row className="pt-5">
        <Col lg={1}/>
        <Col lg={10}>
          <Row className="justify-content-center">
            {/*<ColTool name="ScratchJr" />*/}
            <ColTool name="Scratch"/>
            {/*<ColTool name="TynkerJr" />*/}
            {/*<ColTool name="Tynker" />*/}
            <ColTool name="Hopscotch"/>
            <ColTool name="LegoWedo"/>
            <ColTool name="CodingLab"/>
            <ColTool name="WonderBlockly"/>
            <ColTool name="SpheroEdu"/>
            <ColTool name="MicroBit"/>
            {/*</Row>*/}
            {/*<Row className="justify-content-center mt-4">*/}
            {/*  <ColTool*/}
            {/*    lg*/}
            {/*    name="HTML"*/}
            {/*    style={{ width: '85%', marginTop: '7.5%' }}*/}
            {/*  />*/}
            {/*  <ColTool lg name="CSS" />*/}
            {/*  <ColTool lg name="JS" />*/}
            <ColTool lg name="HTML_JS_CSS"/>
            <ColTool lg name="Python"/>
          </Row>
        </Col>
        <Col lg={2}/>
      </Row>
      {button ? <Row className="w-100">
        <Col className="mx-auto text-center">
          <Link to="/programme/">
            <Button className="btn-round btn-large mt-3 p-3" style={{width: '200px'}}>
              {data?.button}
            </Button>
          </Link>
        </Col>
      </Row> : ''}
    </Container>
  </div>);
}

export default Tools;
