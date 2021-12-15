import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';
import TeamMembers from '../components/TeamMembers';
import { useScrollTop } from 'Helpers';
import useData from 'data';
import { v4 } from 'uuid';

const Title = ({ title }) => (
  <h3 className="mb-4">
    <b>{title}</b>
  </h3>
);

const ColImg = ({ size, src, alt, ...props }) => (
  <Col className="mx-auto my-1" lg={size}>
    <img src={src} alt={alt} width="100%" {...props} />
    {props.extra}
  </Col>
);

const ColIconList = ({ icon, title, list }) => (
  <Col className="mx-auto text-center" lg="4">
    <div className="info">
      <div className="icon icon-danger">
        <i className={`nc-icon ${icon}`} />
      </div>
      <div className="description">
        <h4 className="info-title">{title}</h4>
        {list.map((desc) => (
          <p key={v4()}>{desc}</p>
        ))}
      </div>
    </div>
  </Col>
);

const ColTool = ({ name, lg = false, style }) => (
  <Col md={lg ? 3 : 2} sm={lg ? 4 : 3} xs={lg ? 6 : 4} className="mb-4">
    <img
      src={require(`../assets/img/home/Tools/${name}.png`).default}
      alt={name}
      width="100%"
      style={style}
    />
  </Col>
);

function LandingPage() {
  useScrollTop();
  const data = useData('home')[0];

  return (
    <>
      <div className="wrapper mt-5">
        {/* First Section */}
        <div className="section section-light text-center">
          <Container>
            <Row className="align-items-center">
              <ColImg
                size={6}
                src={
                  require('../assets/img/home/ILPlatform_Teacher.jpg').default
                }
                alt="ILPlatform Teacher"
              />
              <Col className="mx-auto" lg="6">
                <Title title={data[0]?.title} />
                <h5>
                  {data[0]?.content1}
                  <br />
                  <br />
                  {data[0]?.content2}
                </h5>
                <br />
                <Link to="/about-us/">
                  <Button outline className="btn-round btn-large">
                    {data[0]?.button1}
                  </Button>
                </Link>
                <Link to="/classes/">
                  <Button className="btn-round btn-large">
                    {data[0]?.button2}
                  </Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
        {/* Second Section */}
        <div className="section section-light text-center">
          <Container>
            <Row className="align-items-center">
              <Col className="mx-auto" lg="7">
                <Title title={data[1]?.title} />
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
                src={
                  require('../assets/img/home/ILPlatform_Online.jpg').default
                }
                alt="ILPlatform Online Classes"
              />
              <Col className="mx-auto" lg="9">
                <Title title={data[2]?.title} />
                <h5>{data[2]?.content}</h5>
                <Link to="/classes/">
                  <Button className="btn-round btn-large">
                    {data[2]?.button}
                  </Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
        {/* Fourth Section */}
        <div className="section section-light text-center">
          <Container>
            <Row className="align-items-center">
              <Col lg="1" />
              <Col className="mx-auto" lg="6">
                <Title title={data[3]?.title} />
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
        </div>
        {/* Fifth Section */}
        <div className="section section-gray text-center">
          <Container>
            <Row className="align-items-center">
              <Col lg="2" />
              <Col className="mx-auto" lg="8">
                <Title title={data[4]?.title} />
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
        </div>
        {/* Sixth Section */}
        <div className="section section-light text-center">
          <Container>
            <Row className="align-items-center">
              <Col className="mx-auto" lg="8">
                <Title title={data[5]?.title} />
                <h5>{data[5]?.content}</h5>
                <h5>{data[6]?.content}</h5>
              </Col>
              <ColImg
                size={4}
                src={require('../assets/img/home/ILPlatform_Books.jpg').default}
                alt="ILPlatform Books"
                className="d-none d-lg-block"
              />
            </Row>
            <Row className="pt-5">
              <Col lg={2} />
              <Col lg={8}>
                <Row className="justify-content-center">
                  <ColTool name="ScratchJr" />
                  <ColTool name="Scratch" />
                  <ColTool name="TynkerJr" />
                  <ColTool name="Tynker" />
                  <ColTool name="Hopscotch" />
                  <ColTool name="LegoWedo" />
                  <ColTool name="WonderBlockly" />
                  <ColTool name="SpheroEdu" />
                  <ColTool name="MicroBit" />
                </Row>
                <Row className="justify-content-center mt-4">
                  <ColTool
                    lg
                    name="HTML"
                    style={{ width: '85%', marginTop: '7.5%' }}
                  />
                  <ColTool lg name="CSS" />
                  <ColTool lg name="JS" />
                  <ColTool lg name="Python" />
                </Row>
              </Col>
              <Col lg={2} />
            </Row>
          </Container>
        </div>

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
              <Col lg={2} />
              <Col className="mx-auto" lg={5}>
                <Title title={data[7]?.title} />
                <h5>{data[7]?.content}</h5>
              </Col>
              <Col className="mx-auto" lg={3}>
                <Link to="/classes/">
                  <Button className="btn-round btn-large" outline>
                    {data[7]?.button1}
                  </Button>
                </Link>
                <br />
                <br />
                <Link to="/classes/">
                  <Button className="btn-round btn-large">
                    {data[7]?.button2}
                  </Button>
                </Link>
              </Col>
              <Col lg={2} />
            </Row>
          </Container>
        </div>
        {/* Ninth Section */}
        <TeamMembers limit={8} />
      </div>
    </>
  );
}

export default LandingPage;
