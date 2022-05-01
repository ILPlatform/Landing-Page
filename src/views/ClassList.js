import React from 'react';
import {Card, CardBody, CardImg, Col, Container, Row} from 'reactstrap';
import {useScrollTop} from 'Helpers';
import useData from 'data';
import {v4} from 'uuid';

function ClassListOnsite(props) {
  const {type} = props.match.params;
  useScrollTop();
  let data = useData('classlist', {type});
  let classes = type === "camps" ? Object.keys(data?.classes)?.sort((a, b) => new Date(data?.classes[a]?.days?.start) - new Date(data?.classes[b]?.days?.start)).filter((clid) => new Date(data?.classes[clid]?.days?.start) > new Date()) : Object.keys(data?.classes)
  
  return (<>
    <div className="wrapper mt-5">
      <div className="section section-light text-center">
        <Container>
          <Row className="align-items-center">
            <Col className="mx-auto" lg="8">
              <h2 className="mb-4">
                <b>{data?.titles[type]} </b>
              </h2>
              
              <p>
                {classes?.length > 0 ? data?.choose : data?.none}
              </p>
            </Col>
          </Row>
          <br/>
          <Row className="justify-content-center">
            <Col lg={10}>
              <Row className="justify-content-center">
                {classes.map((classKey, i) => {
                  let classData = data?.classes[classKey];
                  return (<Col lg={4} md={6} key={v4()}>
                    <a href={`/classes/${type}/${classData?.classID}`}>
                      <Card color="light">
                        <CardImg
                          className="my-auto mx-0"
                          src={require(`assets/img/classes/${classData.img}`).default}
                          style={{width: 'auto', height: '200px'}}
                        />
                        <CardBody className="text-center p-3">
                          <h4 className="mt-1">
                            <b>
                              {type === 'onsite' && data?.days[classData?.day] + ' - ' + data?.moments[classData?.moment]}
                              {type === 'camps' && data?.campTitles[classData?.period]}
                            </b>
                          </h4>
                          <p className="mt-1 mb-4">
                            {type === 'onsite' && data?.description
                              ?.replace('#0', classData?.ages?.from)
                              .replace('#1', classData?.ages?.to) + classData?.languages
                              ?.map((language, i) => data?.languageList[language] + (i !== classData?.languages?.length - 1 ? ' & ' : ''))
                              .join('')}
                            {type === 'camps' && data?.campDescription
                              ?.replace('#0', classData?.ages?.from)
                              ?.replace('#1', classData?.ages?.to)
                              ?.replace('#2', data?.campActivities[classData?.partnerActivity])
                              ?.replace('#3', classData?.languages
                                ?.map((language, i) => data?.languageList[language] + (i !== classData?.languages?.length - 1 ? ' & ' : ''))
                                .join(''))
                              ?.replace('#4', classData?.days?.start)
                              ?.replace('#5', classData?.days?.end)}
                          </p>
                          <p>
                            <b>
                              {data?.locations[classData?.loc]?.short}
                            </b>
                          </p>
                        </CardBody>
                      </Card>
                    </a>
                  </Col>);
                })}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  </>);
}

export default ClassListOnsite;
