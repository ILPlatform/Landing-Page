import React from 'react';
import {Button, Col, Container, Row} from 'reactstrap';
import {useScrollTop} from 'Helpers';
import useData from 'data';

function CampsDetails(props) {
  const {id, type} = props.match.params;
  useScrollTop();
  const data = useData('classdetails', {id});
  
  let infoDescs = []
  
  if (data?.loc) {
    infoDescs = [data?.public
      ?.replace('#0', data?.ages?.from)
      .replace('#1', data?.ages?.to), data?.locations[data?.loc]?.long, `${data?.weeks[data?.days]?.start} - ${data?.weeks[data?.days]?.end}, ${data?.time?.start}-${data?.time?.end}`, data?.languages?.map((language, i) => data?.languageList[language] + (i !== data?.languages?.length - 1 ? ' & ' : '')), data?.price?.amount + '€'];
  }
  const para = data?.classdetails?.parascolaires
  
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
                  <p>
                    <li className="my-2">
                      <b>{para?.who}</b> {`${para?.students[0]} ${para?.classes[data?.ages[0]]} ${para?.students[1]} ${para?.classes[data?.ages[1]]} ${para?.students[2]}`}
                    </li>
                  </p>
                  <p>
                    <li className="my-2"><b>{para?.where}</b> {data?.locations[data?.where]?.long}</li>
                  </p>
                  <p>
                    <li className="my-2">
                      <b>{para?.when}</b> {`${para?.time[0]} ${data?.when[0].map(d => `${data?.general?.days[d[0]]} ${para?.time[1]} ${d[1]}`).join(" / ")}, ${para?.time[2]} ${data?.when[1]} ${para?.time[3]} ${data?.when[2]}`}
                    </li>
                  </p>
                  <p>
                    <li className="my-2">
                      <b>{para?.price}</b> {`${data?.price[0]}€ ${para?.prices[0]} ${data?.price[1]} ${para?.prices[1]}`}
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
                  <h4><b>{para?.more_info}</b></h4>
                  <h5>{para?.more_info_text}</h5>
                </Col>
              </Row>
              
            </Col>
          </Row>
          <br/> <br/>
          
          <Row className="justify-content-center">
            {data?.classes.map((cid, n) =>
              <Col lg={4} md={6} xs={8} className={"mt-2"}>
              <a href={`/parascolaires/${cid}/register`} target={data?.link && "_blank"}>
                <Button className="w-100 btn-round" color="success">
                  {data?.register} ({data?.general?.days[data?.when[0][n][0]]}, {data?.when[0][n][1]}, {data?.when[0][n][2]})
                </Button>
              </a>
            </Col>)}
          
          </Row>
        </Container>
      </div>
    </div>
  </>);
}

export default CampsDetails;
