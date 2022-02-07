import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import useData from 'data';
import { v4 } from 'uuid';
import ImgNextGen from './ImgNextGen';
import teamMembers from 'data/team.json';

const ColImgTeam = ({ name, src, role, data }) => (
  <Col className="mx-auto my-1 mb-4" lg={3} md={3} sm={4} xs={6}>
    <ImgNextGen
      src={`members/${name.replace(' ', '')}`}
      alt={name}
      className="img-thumbnail m-0 w-100"
    />
    <div>
      <p className="text-center mb-0 mt-2">{name}</p>
      <small>{data?.roles[role]}</small>
    </div>
  </Col>
);

function TeamMembers({ limit = teamMembers.length }) {
  const data = useData('team')[0];

  return (
    <>
      <div className="section section-light text-center">
        <Container>
          <Row className="align-items-center">
            <Col lg={2} />
            <Col className="mx-auto" lg={8}>
              <h3 className="mb-4">
                <b>{data?.title}</b>
              </h3>
              <h5>{data?.content}</h5>
            </Col>
            <Col lg={2} />
          </Row>
          <br />
          <Row className="align-items-center">
            <Col lg={2} />
            <Col lg={8}>
              <Row>
                {teamMembers
                  .filter((member) => member.role >= 0)
                  .sort((a, b) => a.role - b.role + 0.5 - Math.random())
                  .slice(0, limit)
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
