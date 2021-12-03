import React from 'react';

import { Container, Row, Col } from 'reactstrap';
import useData from 'data';
import { v4 } from 'uuid';

const managers = [
  {
    name: 'Daniel Cortild',
    role: 2,
    src: require('../assets/img/members/Daniel Cortild.jpg').default,
  },
  {
    name: 'Madalina Mezei',
    role: 1,
    src: require('../assets/img/members/Madalina Mezei.jpg').default,
  },
];

const teamMembers = [
  {
    name: 'Dominic Olimid',
    role: 0,
    src: require('../assets/img/members/Dominic Olimid.jpg').default,
  },
  {
    name: 'Théodore Cousin',
    role: 0,
    src: require('../assets/img/members/Theodore Cousin.jpg').default,
  },
  {
    name: 'Gregory Pluijm',
    role: 0,
    src: require('../assets/img/members/Gregory Pluijm.jpg').default,
  },
  {
    name: 'Nely Stoichkova',
    role: 0,
    src: require('../assets/img/members/Nely Stoichkova.jpg').default,
  },
  {
    name: 'Cheik Sacko',
    role: 0,
    src: require('../assets/img/members/Cheik Sacko.jpg').default,
  },
  {
    name: 'Gabriel Charib',
    role: 0,
    src: require('../assets/img/members/Gabriel Charib.jpg').default,
  },
  {
    name: 'Samuel Jacquet',
    role: 0,
    src: require('../assets/img/members/Samuel Jacquet.jpg').default,
  },
  {
    name: 'Lorena Mezei',
    role: 0,
    src: require('../assets/img/members/Lorena Mezei.jpg').default,
  },
  {
    name: 'David Lefebvre',
    role: 0,
    src: require('../assets/img/members/David Lefebvre.jpg').default,
  },
  {
    name: 'Maxime Leroy',
    role: 0,
    src: require('../assets/img/members/Maxime Leroy.jpg').default,
  },
];

const mbStyle = {
  marginBottom: '20px',
  marginTop: '20px',
  paddingBottom: '30px',
  paddingTop: '30px',
};

const Title = ({ title }) => (
  <h3 className="mb-4">
    <b>{title}</b>
  </h3>
);

const ColImg = ({ size, src, alt, ...props }) => (
  <Col className="mx-auto my-1" lg={3} sm={4} xs={6}>
    <img src={src} alt={alt} width="100%" {...props} />
    {props.extra}
  </Col>
);

const ColImgTeam = ({ src, name, role, data }) => (
  <ColImg
    src={src}
    alt="ILPlatform Team Member"
    className="img-thumbnail my-1"
    extra={
      <>
        <p className="text-center mb-0">{name}</p>
        <small>{data?.roles[role]}</small>
        <br />
      </>
    }
  />
);

function TeamMembers({ limit = managers.length + teamMembers.length }) {
  const data = useData('team')[0];

  return (
    <>
      <div className="wrapper mt-5">
        <div className="section section-light text-center" style={mbStyle}>
          <Container>
            <Row className="align-items-center">
              <Col lg={2} />
              <Col className="mx-auto" lg={8}>
                <Title title={data?.title} />
                <h5>{data?.content}</h5>
              </Col>
              <Col lg={2} />
            </Row>
            <br />
            <Row className="align-items-center">
              <Col lg={2} />
              <Col lg={8}>
                <Row>
                  {managers.map((member) => (
                    <ColImgTeam key={v4()} {...member} data={data} />
                  ))}
                  {teamMembers
                    .sort(() => 0.5 - Math.random())
                    .slice(0, limit - managers.length)
                    .map((member) => (
                      <ColImgTeam key={v4()} {...member} data={data} />
                    ))}
                </Row>
              </Col>

              <Col lg={2} />
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default TeamMembers;
