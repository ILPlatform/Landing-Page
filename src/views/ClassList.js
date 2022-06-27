import React, {useEffect, useState} from 'react';
import {
  Card,
  CardBody,
  CardImg,
  Col,
  Container,
  Row,
} from 'reactstrap';
import {useScrollTop} from 'Helpers';
import useData from 'data';
import {v4} from 'uuid';

function ClassList() {
  useScrollTop();
  let data = useData();
  const dataClassList = data?.products?.class?.list
  const classes = Object.keys(data?.classes)
  
  
  return (<>
    <div className="wrapper mt-5">
      <div className="section section-light text-center">
        <Container>
          <Row className="align-items-center">
            <Col className="mx-auto" lg="8">
              <h2 className="mb-4">
                <b>{dataClassList?.title} </b>
              </h2>
              
              <p>
                {classes?.length > 0 ? dataClassList?.choose : dataClassList?.none}
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
                    <a href={`/class/${classData?.classID}`}>
                      <Card color="light">
                        <CardImg
                          className="my-auto mx-0"
                          src={require(`assets/img/classes/${classData.img}`).default}
                          style={{width: 'auto', height: '200px'}}
                        />
                        <CardBody className="text-center p-3">
                          <h4 className="mt-1">
                            <b>
                              {data?.general?.days[classData?.day] + ' - ' + data?.general?.moments[classData?.moment]}
                            </b>
                          </h4>
                          <p className="mt-1 mb-4">
                            {dataClassList?.description
                              ?.replace('#0', classData?.ages[0])
                              .replace('#1', classData?.ages[1]) + classData?.languages
                              ?.map((language, i) => data?.general?.languageList[language] + (i !== classData?.languages?.length - 1 ? ' & ' : ''))
                              .join('')}
                            
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

export default ClassList;
