import React from "react";
import { Button, Col, Container, Row } from "reactstrap";
import useData from "../data";
import { v4 } from "uuid";
import teamMembers from "../data/team.json";
import { Link } from "react-router-dom";
import ImageWebp from "./ImageWebp";

function TeamMembers({ limit = teamMembers.length }) {
  const data = useData()?.information?.team;

  return (
    <>
      <div className="section section-light text-center">
        <Container>
          <Row className="align-items-center">
            <Col lg={2} />
            <Col className="mx-auto" lg={8}>
              <h2 className="mb-4 h3">
                <b>{data?.title}</b>
              </h2>
              <p className={"h5"}>{data?.content}</p>
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
                    <Col
                      className="mx-auto my-1 mb-4"
                      lg={3}
                      md={3}
                      sm={4}
                      xs={6}
                      key={v4()}
                      data={data}
                    >
                      {member?.link ? (
                        <a href={member?.link} target="_blank" rel="noreferrer">
                          <ImageWebp
                            srcWebp={
                              require(
                                `assets/img/members/${member.name.replaceAll(" ", "")}.webp`,
                              ).default
                            }
                            src={
                              require(
                                `assets/img/members/${member.name.replaceAll(" ", "")}.png`,
                              ).default
                            }
                            alt={member.name}
                            className="m-0 w-100"
                            style={{
                              backgroundImage:
                                "url(" +
                                require(
                                  `assets/img/members/BackgroundLeaves.jpeg`,
                                ).default +
                                ")",
                              backgroundSize: "cover",
                              borderRadius: "16px",
                            }}
                          />
                        </a>
                      ) : (
                        <ImageWebp
                          srcWebp={
                            require(
                              `assets/img/members/${member.name.replaceAll(" ", "")}.webp`,
                            ).default
                          }
                          src={
                            require(
                              `assets/img/members/${member.name.replaceAll(" ", "")}.png`,
                            ).default
                          }
                          alt={member.name}
                          className="m-0 w-100"
                          style={{
                            backgroundImage:
                              "url(" +
                              require(
                                `assets/img/members/BackgroundLeaves.jpeg`,
                              ).default +
                              ")",
                            backgroundSize: "cover",
                            borderRadius: "16px",
                          }}
                        />
                      )}
                      <div>
                        <p className="text-center mb-0 mt-2">
                          {member.link
                            ? member.name
                            : member.name.split(" ")[0]}
                        </p>
                        <small>{data?.roles[member.role]}</small>
                      </div>
                    </Col>
                  ))}
              </Row>
              {limit === teamMembers.length ? (
                <a href="mailto:info@ilplatform.be">
                  <Button
                    outline
                    className="btn-round btn-large"
                    style={{ width: "200px" }}
                  >
                    {data?.join}
                  </Button>
                </a>
              ) : (
                <Link
                  to="/about/"
                  className="margin-auto justify-content-center"
                >
                  <Button
                    outline
                    className="btn-round btn-large"
                    style={{ width: "240px" }}
                  >
                    {data?.about}
                  </Button>
                </Link>
              )}
            </Col>

            <Col lg={2} />
          </Row>
        </Container>
      </div>
    </>
  );
}

export default TeamMembers;
