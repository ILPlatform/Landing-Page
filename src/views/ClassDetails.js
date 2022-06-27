import React from 'react';
import {Button, Col, Container, Row} from 'reactstrap';
import {useScrollTop} from 'Helpers';
import useData from 'data';
import {v4} from 'uuid';

function ClassDetails(props) {
  const {id, type} = props.match.params;
  useScrollTop();
  
  const data = useData(id);
  const dataClassDetails = data?.products?.class?.details;
  const dataClass = data?.id_specific;
  
  let infoDescs = [
    dataClassDetails?.public_level[dataClass?.level]?.replace('#0', dataClass?.ages[0]).replace('#1', dataClass?.ages[1]),
    data?.locations[dataClass?.loc]?.long,
    `${data?.general?.days[dataClass?.day]}, ${dataClass?.time?.start}-${dataClass?.time?.end}`,
    dataClass?.languages?.map((language, i) => data?.general?.languageList[language] + (i !== dataClass?.languages?.length - 1 ? ' & ' : '')),
    dataClassDetails?.price?.replace('#0', dataClass?.price[0])?.replace('#1', dataClass?.price[1])
  ]
  
  return (<>
      <div className="wrapper mt-5 pt-5">
        <div className="section text-center">
          <Container>
            <Row className="justify-content-center align-items-center">
              <Col className="text-left" lg={6} md={7}>
                <h2 className="mb-4">
                  <b>{dataClassDetails?.title}</b>
                </h2>
                <br/>
                <h5>
                  <ul>
                    {dataClassDetails?.info?.map((title, i) => (<li className="my-2" key={v4()}>
                        <b>{dataClassDetails?.info[i]}</b> {infoDescs[i]}
                      </li>))}
                  </ul>
                </h5>
              </Col>
              <Col lg={4} md={5}>
                <img
                  src={require(`assets/img/classes/${dataClass?.img}`).default}
                  alt="ILPlatform Classes"
                  className="img-thumbnail"
                />
              </Col>
            </Row>
            <br/>
            <Row className="justify-content-center">
              <Col lg={10} md={12} className="text-left">
                <h2 className="text-center">
                  <b>{dataClassDetails?.detailsTitle}</b>
                </h2>
                <br/>
                {dataClassDetails['module-details'][dataClass?.details]?.map((det) => (<h5 key={v4()}>{det}</h5>))}
              </Col>
            </Row>
            <br/>
                <h2 className="text-center mb-3">
                  <b>{dataClassDetails?.exampleTitle}</b>
                </h2>
                {Object.values(dataClassDetails['example-projects'][dataClass?.details]).map((example, key) => (
                  <Row className="justify-content-center align-items-center" key={v4()}>
                    <Col
                      lg={{size: 6, order: key % 2}}
                      md={{size: 7, order: (key + 1) % 2}}
                      className="text-left"
                    >
                      {example.text?.map((ex) => (<h5 key={v4()}>{ex}</h5>))}
                    </Col>
                    <Col
                      lg={{size: 4, order: (key + 1) % 2}}
                      md={{size: 5, order: key % 2}}
                    >
                      <img
                        src={example.img}
                        alt="ILPlatform Example Project"
                        width="100%"
                        className="img-thumbnail"
                      />
                    </Col>
                  </Row>))}
            <br/> <br/>
            <Row className="justify-content-center">
              <Col lg={6} md={8} xs={10}>
                <a href={dataClass?.link ? dataClass?.link : `/class/${id}/register`} target={dataClass?.link && "_blank"}>
                  <Button className="w-100 btn-round" color="success">
                    {dataClassDetails?.register}
                  </Button>
                </a>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>);
}

export default ClassDetails;
