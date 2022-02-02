import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import useData from 'data';
import { v4 } from 'uuid';
import ImgNextGen from './ImgNextGen';

const managers = [
  {
    name: 'Daniel Cortild',
    role: 2,
  },
  // {
  //   name: 'Madalina Mezei',
  //   role: 1,
  //   src: require('../assets/img/members/Madalina Mezei.jpg').default,
  // },
  {
    name: 'Ulrich Djoufack',
    role: 3,
  },
];

const teamMembers = [
  {
    name: 'Dominic Olimid',
    role: 0,
  },
  {
    name: 'Theodore Cousin',
    role: 0,
  },
  {
    name: 'Gregory Pluijm',
    role: 0,
  },
  {
    name: 'Nely Stoichkova',
    role: 0,
  },
  {
    name: 'Cheik Sacko',
    role: 0,
  },
  {
    name: 'Gabriel Charib',
    role: 0,
  },
  {
    name: 'Samuel Jacquet',
    role: 0,
  },
  {
    name: 'Lorena Mezei',
    role: 0,
  },
  {
    name: 'David Lefebvre',
    role: 0,
  },
  {
    name: 'Maxime Leroy',
    role: 0,
  },
  {
    name: 'Andrea Youatou',
    role: 0,
  },
  {
    name: 'Louis Ronsse',
    role: 0,
  },
];

const Title = ({ title }) => (
  <h3 className="mb-4">
    <b>{title}</b>
  </h3>
);

const getSRC = (src, format) => {
  try {
    return require(`assets/img/members/${src}/image.${format}`).default;
  } catch (error) {}
};

const ColImgTeam = ({ name, src, role, data }) => (
  <Col className="mx-auto my-1 mb-4" lg={3} sm={4} xs={6}>
    <div style={{ marginTop: '90%' }}></div>
    {console.log(getSRC(src, 'jp2'))}
    <ImgNextGen
      src={`members/${name.replace(' ', '')}`}
      alt={`${name}`}
      style={{
        position: 'absolute',
        top: -10,
        bottom: 0,
        right: 0,
        left: 0,
        width: '80%',
        height: '80%',
        margin: '10%',
      }}
      className="img-thumbnail my-0"
    />
    <div>
      <p className="text-center mb-0">{name}</p>
      <small>{data?.roles[role]}</small>
      <br />
    </div>
  </Col>
);

function TeamMembers({ limit = managers.length + teamMembers.length }) {
  const data = useData('team')[0];

  return (
    <>
      <div className="section section-light text-center">
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
    </>
  );
}

export default TeamMembers;
