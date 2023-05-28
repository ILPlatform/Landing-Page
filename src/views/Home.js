import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Button, Col, Container, Row} from 'reactstrap';
import TeamMembers from '../components/TeamMembers';
import {useScrollTop} from 'Helpers';
import useData from 'data';
import {v4} from 'uuid';
import Tools from "../components/Tools";
import ImageWebp from "../components/ImageWebp";
import DocumentMeta from 'react-document-meta';

const ColImg = ({size, srcWebp, src, alt, ...props}) => (<Col className="mx-auto my-1" lg={size}>
  <ImageWebp srcWebp={srcWebp} src={src} alt={alt} width="100%" {...props} />
  {props.extra}
</Col>);

function LandingPage() {
  useScrollTop();
  const data = useData()?.information?.home;
  const meta = {
    title: data?.page_title,
    description: data?.page_description,
    canonical: `https://www.ilplatform.be/`,
    meta: {
      property: {
        'og:title': data?.page_title,
        'twitter:title': data?.page_title,
        'og:description': data?.page_description,
        'og:image': require('../assets/img/home/ILPlatform_Teacher.jpg').default,
        'og:site_name': 'ILPlatform',
        'og:type': 'website',
        'og:locale': 'fr',
        'og:url': `https://www.ilplatform.be/`
      }
    }
  };
  
  return (<DocumentMeta {...meta}>
    <div className="wrapper mt-5">
      {/* First Section */}
      <div className="section section-light text-center">
        <Container>
          <Row className="align-items-center">
            <ColImg
              size={6}
              srcWebp={require('../assets/img/home/ILPlatform_Teacher.webp').default}
              src={require('../assets/img/home/ILPlatform_Teacher.jpg').default}
              alt="ILPlatform Teacher"
            />
            <Col className="mx-auto" lg="6">
              <h1 className="title h3">{data[0]?.title}</h1>
              <p className="h5">
                {data[0]?.content1}
                {/*<br/>*/}
                {/*<br/>*/}
                {/*{data[0]?.content2}*/}
              </p>
              <br/>
              <Link to="/about">
                <Button outline className="btn-round btn-large w-75 mb-2">
                  {data[0]?.button1}
                </Button>
              </Link>
              <br />
              <a href="https://stageo.ilplatform.be/" rel={"nofollow"}>
                <Button className="btn-round btn-large w-75 mt-2">
                  {data[0]?.button2}
                </Button>
              </a>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Between First and Second Section */}
      <div className="section section-gray text-center">
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col className="mx-auto" lg="5">
              <h2 className="title h3">{data["1.5"]?.title}</h2>
              <p className={"h5"}>{data["1.5"]?.content}</p>
              <p className={"h5"}>{data["1.5"]?.content2}</p>
            </Col>
            <Col className="mx-auto" lg="7">
              <iframe width="100%" height="340" src={data["1.5"]?.video}
                      title="YouTube video player" frameBorder="0"
                      loading={"lazy"} defer
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen></iframe>
            </Col>
          
          </Row>
        </Container>
      </div>
      {/* Second Section */}
      <div className="section section-light text-center">
        <Container>
          <Row className="align-items-center">
            <Col className="mx-auto" lg="7">
              <h2 className="title h3">{data[1]?.title}</h2>
              <p className={"h5"}>{data[1]?.content}</p>
            </Col>
            <ColImg
              size={5}
              srcWebp={require('../assets/img/home/ILPlatform_Robot.webp').default}
              src={require('../assets/img/home/ILPlatform_Robot.jpg').default}
              alt="ILPlatform Robot"
            />
          </Row>
        </Container>
      </div>
      {/* Third Section */}
      <div className="section section-gray text-center">
        <Container>
          <Row className="align-items-center">
            <ColImg
              size={3}
              srcWebp={require('../assets/img/home/ILPlatform_Online.webp').default}
              src={require('../assets/img/home/ILPlatform_Online.jpg').default}
              alt="ILPlatform Online Classes"
              className="rounded"
            />
            <Col className="mx-auto" lg="9">
              <h2 className="title h3">{data[2]?.title}</h2>
              <p className={"h5"}>{data[2]?.content}</p>
              <a href="https://stageo.ilplatform.be/" rel={"nofollow"}>
                <Button className="btn-round btn-large w-50 mt-4">
                  {data[2]?.button}
                </Button>
              </a>
            </Col>
          </Row>
        </Container>
      </div>
      
      <Tools button={true}/>
      
      <div className="section section-gray text-center">
        <Container>
          <Row className="align-items-center">
            <Col lg={2}/>
            <Col className="mx-auto" lg={5}>
              <h2 className="title h3">{data[7]?.title}</h2>
              <p className={"h5"}>{data[7]?.content}</p>
            </Col>
            <Col className="mx-auto text-center" lg={3}>
              <ImageWebp
                className={"w-100 mb-4"}
                srcWebp={require('../assets/img/home/ILPlatform_Computer2.webp').default}
                src={require('../assets/img/home/ILPlatform_Computer2.png').default}
                alt="ILPlatform Computer"
              />
              <a href="https://stageo.ilplatform.be/" rel={"nofollow"}>
                <Button className="btn-round w-100">
                  {data[7]?.button2}
                </Button>
              </a>
            </Col>
            <Col lg={2}/>
          </Row>
        </Container>
      </div>
      {/* Ninth Section */}
      <TeamMembers limit={8}/>
    </div>
  </DocumentMeta>);
}

export default LandingPage;
