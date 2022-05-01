import React from 'react';
import {Button, Col, Container, Row} from 'reactstrap';
import {useScrollTop} from 'Helpers';
import useData from 'data';
import {v4} from 'uuid';

function ClassDetails(props) {
  const {id, type} = props.match.params;
  useScrollTop();
  const data = useData('classdetails', {id});
  
  let infoDescs = []
  
  if (data?.loc) {
    infoDescs = [data?.public
      ?.replace('#0', data?.ages?.from)
      .replace('#1', data?.ages?.to), data?.locations[data?.loc]?.long, type === 'onsite' ? `${data?.days[data?.day]}, ${data?.time?.start}-${data?.time?.end}` : `${data?.days?.start} - ${data?.days?.end}, ${data?.time?.start}-${data?.time?.end}`, data?.languages?.map((language, i) => data?.languageList[language] + (i !== data?.languages?.length - 1 ? ' & ' : '')), type === 'onsite' ? data?.priceText
      ?.replace('#0', data?.price?.amount)
      .replace('#1', data?.price?.classes) : data?.price?.amount + '€',];
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
                    {data?.info?.map((title, i) => (<li className="my-2" key={v4()}>
                        <b>{data?.info[i]}</b> {infoDescs && infoDescs[i]}
                      </li>))}
                  </ul>
                </h5>
              </Col>
              <Col lg={4} md={5}>
                <img
                  src={require(`assets/img/classes/${data?.img}`).default}
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
                {type === 'onsite' && data['module-details'][data?.details]?.map((det) => (<h5 key={v4()}>{det}</h5>))}
                {type === 'camps' && data['camp-details'][data?.loc]?.map((det) => (<h5 key={v4()}>{det}</h5>))}
              </Col>
            </Row>
            <br/>
            {type === 'onsite' && (<>
                <h2 className="text-center mb-3">
                  <b>{data?.exampleTitle}</b>
                </h2>
                {Object.values(data['example-projects'][data?.details]).map((example, key) => (
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
              </>)}
            <br/> <br/>
            <Row className="justify-content-center">
              <Col lg={6} md={8} xs={10}>
                <a href={`/classes/${type}/${id}/register`}>
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

export default ClassDetails;
