import React from 'react';
import {Button, Col, Container, Row} from 'reactstrap';
import {useScrollTop} from 'Helpers';
import useData from 'data';
import {v4} from 'uuid';

function CampDetails(props) {
  const { id } = props.match.params;
  useScrollTop();
  const data = useData(id);
  const dataCampDetails = data?.products?.camp?.details;
  const dataCamp = data?.id_specific;
  
  const infoDescs = [
    dataCampDetails?.public?.replace('#0', dataCamp?.ages?.from).replace('#1', dataCamp?.ages?.to),
    data?.locations[dataCamp?.loc]?.long,
    `${data?.weeks[dataCamp?.days]?.start} - ${data?.weeks[dataCamp?.days]?.end}, ${dataCamp?.time?.start}-${dataCamp?.time?.end}`, dataCamp?.languages?.map((language, i) => data?.general?.languageList[language] + (i !== dataCamp?.languages?.length - 1 ? ' & ' : '')),
    dataCamp?.price?.amount + '€'
  ];
  
  return (<>
    <div className="wrapper mt-5 pt-5">
      <div className="section text-center">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col className="text-left" lg={6} md={7}>
              <h2 className="mb-4">
                <b>{dataCampDetails?.title}</b>
              </h2>
              <br/>
              <h5>
                <ul>
                  {dataCampDetails?.info?.map((title, i) => (
                    <li className="my-2" key={v4()}>
                      <b>{dataCampDetails?.info[i]}</b> {infoDescs && infoDescs[i]}
                    </li>))}
                </ul>
              </h5>
            </Col>
            <Col lg={4} md={5}>
              <img
                src={require(`assets/img/classes/${dataCampDetails[dataCamp?.loc][4]}`).default}
                alt="ILPlatform Classes"
                className="img-thumbnail"
              />
            </Col>
          </Row>
          <br/>
          <Row className="justify-content-center">
            <Col lg={10} md={12} className="text-left">
              <h2 className="text-center">
                <b>{dataCampDetails?.detailsTitle}</b>
              </h2>
              <br/>
              <Row>
                <Col xs={12} sm={6} md={4} className={"text-center"}>
                  <img
                    src={
                      dataCamp?.days?.includes("christmas") ?
                        require(`assets/img/classes/ILPlatform_Christmas2.png`).default
                      : require(`assets/img/classes/ILPlatform_Summer.png`).default
                    }
                    alt="ILPlatform Classes"
                    className="img-thumbnail mt-4"
                  />
                </Col>
                <Col xs={12} sm={6} md={8}>
                  <h4><b>{dataCampDetails['ilplatform'][0]}</b></h4>
                  <h5>{dataCampDetails['ilplatform'][1]}</h5>
                </Col>
              </Row>
              
              
              <Row>
                <Col xs={12} sm={6} md={8}>
                  <h4><b>{dataCampDetails[dataCamp?.loc][0]}</b></h4>
                  <h5>{dataCampDetails[dataCamp?.loc][1]}</h5>
                  <h5>{dataCampDetails[dataCamp?.loc]["to_bring"] || ""}</h5>
                </Col>
                <Col >
                  <img
                    src={require(`assets/img/classes/${dataCampDetails[dataCamp?.loc][3]}`).default}
                    alt="ILPlatform Classes"
                    className="img-thumbnail mt-4"
                  />
                </Col>
              </Row>
              <h4><b>{dataCampDetails['schedule'][0]}</b></h4>
              <h5>{dataCampDetails['schedule'][1]}</h5>
              <ul>{dataCampDetails[dataCamp?.loc]["time"].map((det) => (
                <li key={v4()}><h5>{det}</h5></li>))}</ul>
              <h4><b>{dataCampDetails['garderie'][0]}</b></h4>
              <h5>{dataCampDetails[dataCamp?.loc]["garderie"]}</h5>
            </Col>
          </Row>
          <br/> <br/>
          <Row className="justify-content-center">
            <Col lg={6} md={8} xs={10}>
              <a href={dataCamp?.link ? dataCamp?.link : `/camps/${id}/register`} target={dataCamp?.link && "_blank"}>
                <Button className="w-100 btn-round" color="success">
                  {dataCampDetails?.register}
                </Button>
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  </>);
}

export default CampDetails;
