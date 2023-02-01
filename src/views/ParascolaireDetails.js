import React from 'react';
import {Button, Col, Container, Row} from 'reactstrap';
import {useScrollTop} from 'Helpers';
import useData from 'data';

function ParascolaireDetails(props) {
  const {id} = props.match.params;
  useScrollTop();
  const data = useData(id);
  const dataParaDetails = data?.products?.parascolaire?.details
  const dataPara = data?.id_specific
  console.log(dataPara)
  
  return (<>
    <div className="wrapper mt-5 pt-5">
      <div className="section text-center">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col className="text-left" lg={6} md={7}>
              <h2 className="mb-4">
                <b>{dataPara?.title}</b>
              </h2>
              <br/>
              <h5>
                <ul>
                  <p>
                    <li className="my-2">
                      <b>{dataParaDetails?.who}</b> {`${dataParaDetails?.students[0]} ${dataParaDetails?.classes[dataPara?.ages[0]]} ${dataParaDetails?.students[1]} ${dataParaDetails?.classes[dataPara?.ages[1]]} ${dataParaDetails?.students[2]}`}
                    </li>
                  </p>
                  <p>
                    <li className="my-2"><b>{dataParaDetails?.where}</b> {data?.locations[dataPara?.where]?.long}</li>
                  </p>
                  <p>
                    <li className="my-2">
                      <b>{dataParaDetails?.when}</b> {`${dataParaDetails?.time[0]} ${dataPara?.when[0].map(d => `${data?.general?.days[d[0]]} ${dataParaDetails?.time[1]} ${d[1]}`).join(" / ")}, ${dataParaDetails?.time[2]} ${dataPara?.when[1]} ${dataParaDetails?.time[3]} ${dataPara?.when[2]}`}
                    </li>
                  </p>
                  <p>
                    <li className="my-2">
                      <b>{dataParaDetails?.price}</b> {`${dataPara?.price[0]}€ ${dataParaDetails?.prices[0]} ${dataPara?.price[1]} ${dataParaDetails?.prices[1]}`}
                    </li>
                  </p>
                </ul>
              </h5>
            </Col>
            <Col lg={4} md={5}>
              <img
                src={require(`assets/img/classes/ILPlatform_Parascolaires.png`).default}
                alt="ILPlatform Classes"
                className="img-thumbnail"
              />
            </Col>
          </Row>
          <br/>
          <Row className="justify-content-center">
            <Col lg={10} md={12} className="text-left">
              <br/>
              <Row>
                <Col xs={12} sm={6} md={4} className={"text-center"}>
                  <img
                    src={require(`assets/img/classes/ILPlatform_Sphero.jpeg`).default}
                    alt="ILPlatform Classes"
                    className="img-thumbnail mt-4"
                  />
                </Col>
                <Col xs={12} sm={6} md={8}>
                  <h4><b>{dataParaDetails?.more_info}</b></h4>
                  <h5>{dataParaDetails?.more_info_text}</h5>
                </Col>
              </Row>
              
            </Col>
          </Row>
          <br/> <br/>
          
          <Row className="justify-content-center">
            {dataPara?.classes.map((cid, n) =>
              <Col lg={4} md={6} xs={8} className={"mt-2"}>
              <a href={`/parascolaires/${cid}/register`} target={data?.link && "_blank"}>
                <Button className="w-100 btn-round" color="success" disabled={dataPara?.full[n]}>
                  {dataParaDetails?.register} ({data?.general?.days[dataPara?.when[0][n][0]]}, {dataPara?.when[0][n][1]}, {dataPara?.when[0][n][2]})
                  {dataPara?.full[n] ? <><br/>{dataParaDetails?.full}</> : ''}
                </Button>
              </a>
            </Col>)}
          
          </Row>
          <Row className="justify-content-center">
            
              <Col lg={4} md={6} xs={8} className={"mt-2"}>
                <a href="mailto:info@ilplatform.be?subject=Liste d'attente&body=Veuillez fournir le nom, la classe et l'école de votre enfant">
                  <Button className="w-100 btn-round" color="success">
                    {dataParaDetails?.waitingList}
                  </Button>
                </a>
              </Col>
  
          </Row>
        </Container>
      </div>
    </div>
  </>);
}

export default ParascolaireDetails;
