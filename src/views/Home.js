import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Button, Col, Container, Row} from 'reactstrap';
import TeamMembers from '../components/TeamMembers';
import {useScrollTop} from 'Helpers';
import useData from 'data';
import {v4} from 'uuid';
import Tools from "../components/Tools";

const ColImg = ({size, src, alt, ...props}) => (<Col className="mx-auto my-1" lg={size}>
  <img src={src} alt={alt} width="100%" {...props} />
  {props.extra}
</Col>);

const ColIconList = ({icon, title, list}) => (<Col className="mx-auto text-center" lg="4">
  <div className="info">
    <div className="icon icon-danger">
      <i className={`nc-icon ${icon}`}/>
    </div>
    <div className="description">
      <h4 className="info-title">{title}</h4>
      {list.map((desc) => (<p key={v4()}>{desc}</p>))}
    </div>
  </div>
</Col>);

function LandingPage() {
  useScrollTop();
  const data = useData()?.information?.home;
  useEffect(() => {
    document.title = data?.page_title;
  }, []);
  
  return (<>
    <div className="wrapper mt-5">
      {/* First Section */}
      <div className="section section-light text-center">
        <Container>
          <Row className="align-items-center">
            <ColImg
              size={6}
              src={require('../assets/img/home/ILPlatform_Teacher.jpg').default}
              alt="ILPlatform Teacher"
            />
            <Col className="mx-auto" lg="6">
              <h3 className="title">{data[0]?.title}</h3>
              <h5>
                {data[0]?.content1}
                <br/>
                <br/>
                {data[0]?.content2}
              </h5>
              <br/>
              {/*<Link to="/about-us/">*/}
              {/*  <Button outline className="btn-round btn-large">*/}
              {/*    {data[0]?.button1}*/}
              {/*  </Button>*/}
              {/*</Link>*/}
              {/*<Link to="/classes/">*/}
              {/*  <Button className="btn-round btn-large w-50">*/}
              {/*    {data[0]?.button2}*/}
              {/*  </Button>*/}
              {/*</Link>*/}
            </Col>
          </Row>
        </Container>
      </div>
      {/* Between First and Second Section */}
      <div className="section section-gray text-center">
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col className="mx-auto" lg="5">
              <h3 className="title">{data["1.5"]?.title}</h3>
              <h5>{data["1.5"]?.content}</h5>
              <h5>{data["1.5"]?.content2}</h5>
            </Col>
            <Col className="mx-auto" lg="7">
              <iframe width="560" height="315" src={data["1.5"]?.video}
                      title="YouTube video player" frameBorder="0"
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
              <h3 className="title">{data[1]?.title}</h3>
              <h5>{data[1]?.content}</h5>
            </Col>
            <ColImg
              size={5}
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
              src={require('../assets/img/home/ILPlatform_Online.jpg').default}
              alt="ILPlatform Online Classes"
              className="rounded"
            />
            <Col className="mx-auto" lg="9">
              <h3 className="title">{data[2]?.title}</h3>
              <h5>{data[2]?.content}</h5>
              <a href="https://stageo.ilplatform.be/">
                <Button className="btn-round btn-large w-50 mt-4">
                  {data[2]?.button}
                </Button>
              </a>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Fourth Section */}
      {/* <div className="section section-light text-center">
          <Container>
            <Row className="align-items-center">
              <Col lg="1" />
              <Col className="mx-auto" lg="6">
                <h3 className="title">{data[3]?.title}</h3>
                <h5>{data[3]?.content}</h5>
              </Col>
              <Col lg="1" />
              <ColImg
                size={4}
                src={
                  require('../assets/img/home/ILPlatform_Desktop.jpg').default
                }
                alt="ILPlatform Curriculum"
              />
            </Row>
          </Container>
        </div> */}
      {/* Fifth Section */}
      {/* <div className="section section-gray text-center">
          <Container>
            <Row className="align-items-center">
              <Col lg="2" />
              <Col className="mx-auto" lg="8">
                <h3 className="title">{data[4]?.title}</h3>
                <h5>{data[4]?.content}</h5>
              </Col>
              <Col lg="2" />
            </Row>

            <Row className="align-items-center">
              <ColIconList
                icon="nc-glasses-2"
                title={data[4]?.list[0].title}
                list={data[4]?.list[0].content}
              />
              <ColIconList
                icon="nc-spaceship"
                title={data[4]?.list[1].title}
                list={data[4]?.list[1].content}
              />
              <ColIconList
                icon="nc-chat-33"
                title={data[4]?.list[2].title}
                list={data[4]?.list[2].content}
              />
            </Row>
          </Container>
        </div> */}
      
      {/* Sixth Section */}
      <Tools button={true}/>
      {/* Seventh Section
        <div className="section section-light text-center">
          <Container>
            <Row className="align-items-center">
              <Col lg={2} />
              <Col className="mx-auto" lg={8}>
                <Title title={data[6]?.title} />
                <h5>{}</h5>
              </Col>
              <Col lg={2} />
            </Row>
            <Row className="align-items-center">
              <Title title="ADD THE DIFFERENT PRODUCTS" />
            </Row>
          </Container>
        </div> */}
      {/* Eigth Section */}
      <div className="section section-gray text-center">
        <Container>
          <Row className="align-items-center">
            <Col lg={2}/>
            <Col className="mx-auto" lg={5}>
              <h3 className="title">{data[7]?.title}</h3>
              <h5>{data[7]?.content}</h5>
            </Col>
            <Col className="mx-auto text-center" lg={3}>
              {/*<Link to="/about-us/">*/}
              {/*  <Button className="btn-round btn-large w-100" outline>*/}
              {/*    {data[7]?.button1}*/}
              {/*  </Button>*/}
              {/*</Link>*/}
              {/*<br/>*/}
              {/*<br/>*/}
              <img
                className={" w-100"}
                style={{margin: "15px"}}
                src={require('../assets/img/home/ILPlatform_Computer2.png').default}
                alt="ILPlatform Computer"
              />
              <a href="https://stageo.ilplatform.be/">
                <Button className="btn-round btn-large w-100">
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
  </>);
}

export default LandingPage;
