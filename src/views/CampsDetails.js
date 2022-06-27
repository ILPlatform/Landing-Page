import React from 'react';
import {Button, Col, Container, Row} from 'reactstrap';
import {useScrollTop} from 'Helpers';
import useData from 'data';
import {v4} from 'uuid';

function CampsDetails(props) {
  const {id, type} = props.match.params;
  useScrollTop();
  const data = useData('classdetails', {id});
  
  let infoDescs = []
  
  if (data?.loc) {
    infoDescs = [data?.public
      ?.replace('#0', data?.ages?.from)
      .replace('#1', data?.ages?.to), data?.locations[data?.loc]?.long, `${data?.weeks[data?.days]?.start} - ${data?.weeks[data?.days]?.end}, ${data?.time?.start}-${data?.time?.end}`, data?.languages?.map((language, i) => data?.general?.languageList[language] + (i !== data?.languages?.length - 1 ? ' & ' : '')),
      data?.price?.amount + '€'];
  }
  
  return (<>
    <div className="wrapper mt-5 pt-5">
      <div className="section text-center">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col className="text-left" lg={6} md={7}>
              <h2 className="mb-4">
                <b>{data?.title}</b>
              </h2>
              <br/>
              <h5>
                <ul>
                  {data?.info?.map((title, i) => (
                    <li className="my-2" key={v4()}>
                      <b>{data?.info[i]}</b> {infoDescs && infoDescs[i]}
                    </li>))}
                </ul>
              </h5>
            </Col>
            <Col lg={4} md={5}>
              <img
                src={require(`assets/img/classes/${data?.classdetails['camp-details'][data?.loc][4]}`).default}
                alt="ILPlatform Classes"
                className="img-thumbnail"
              />
            </Col>
          </Row>
          <br/>
          <Row className="justify-content-center">
            <Col lg={10} md={12} className="text-left">
              <h2 className="text-center">
                <b>{data?.detailsTitle}</b>
              </h2>
              <br/>
              <Row>
                <Col xs={12} sm={6} md={4} className={"text-center"}>
                  <img
                    src={require(`assets/img/classes/${data?.classdetails['camp-details']['ilplatform'][2]}`).default}
                    alt="ILPlatform Classes"
                    className="img-thumbnail mt-4"
                  />
                </Col>
                <Col xs={12} sm={6} md={8}>
                  <h4><b>{data?.classdetails['camp-details']['ilplatform'][0]}</b></h4>
                  <h5>{data?.classdetails['camp-details']['ilplatform'][1]}</h5>
                </Col>
              </Row>
              
              
              <Row>
                <Col xs={12} sm={6} md={8}>
                  <h4><b>{data?.classdetails['camp-details'][data?.loc][0]}</b></h4>
                  <h5>{data?.classdetails['camp-details'][data?.loc][1]}</h5>
                  <h5>{data?.classdetails['camp-details'][data?.loc]["to_bring"] || ""}</h5>
                </Col>
                <Col >
                  <img
                    src={require(`assets/img/classes/${data?.classdetails['camp-details'][data?.loc][3]}`).default}
                    alt="ILPlatform Classes"
                    className="img-thumbnail mt-4"
                  />
                </Col>
              </Row>
              <h4><b>{data?.classdetails['camp-details']['schedule'][0]}</b></h4>
              <h5>{data?.classdetails['camp-details']['schedule'][1]}</h5>
              <ul>{data?.classdetails['camp-details'][data?.loc]["time"].map((det) => (
                <li key={v4()}><h5>{det}</h5></li>))}</ul>
              <h4><b>{data?.classdetails['camp-details']['garderie'][0]}</b></h4>
              <h5>{data?.classdetails['camp-details'][data?.loc]["garderie"]}</h5>
            </Col>
          </Row>
          <br/> <br/>
          <Row className="justify-content-center">
            <Col lg={6} md={8} xs={10}>
              <a href={data?.link ? data?.link : `/camps/${id}/register`} target={data?.link && "_blank"}>
                <Button className="w-100 btn-round" color="success">
                  {data?.register}
                </Button>
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  </>);
}

export default CampsDetails;
