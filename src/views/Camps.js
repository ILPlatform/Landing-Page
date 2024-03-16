import React, {useEffect} from 'react';
import {Card, CardBody, CardImg, Col, Container, Row} from 'reactstrap';
import {useScrollTop} from 'Helpers';
import useData from 'data';
import Tools from "../components/Tools";
import {v4} from "uuid";
import DocumentMeta from 'react-document-meta';
import ImageWebp from "../components/ImageWebp";
import campInfo from 'data/camps.json';


function Camps() {
  useScrollTop();
  const data = useData()?.information?.camps;
  const meta = {
    title: data?.page_title,
    description: data?.page_description,
    canonical: 'https://www.ilplatform.be/camps/',
    meta: {
      property: {
        'og:title': data?.page_title,
        'twitter:title': data?.page_title,
        'og:description': data?.page_description,
        'og:image': require('../assets/img/programme/ILPlatform_Books.png').default,
        'og:site_name': 'ILPlatform',
        'og:type': 'website',
        'og:locale': 'fr',
        'og:url': 'https://www.ilplatform.be/camps/'
      }
    }
  };
  
  return (<DocumentMeta {...meta}>
    <div className="wrapper mt-5 pt-5">
      <Container className="text-center">
        <h1>{data?.title}</h1>
        <h5>{data?.subtitle}</h5>
      </Container>
      
      {/* Different Camp Weeks */}
      <div className="section section-light text-center">
        <Container>
          <Row className="pt-2 justify-content-center">
            {/*<Col lg={2}/>*/}
            
            {Object.keys(campInfo)?.map(id => (<Col lg={3} md={4} key={v4()}>
              <a href={`/camps/${id}`}>
                <Card color="light">
                  <CardImg
                    className="my-auto mx-0"
                    src={require(`assets/img/camps/ILPlatform_Camp_${id}.png`).default}
                    style={{width: 'auto', height: '200px'}}
                  />
                  <CardBody className="text-center p-3">
                    <h3 className="h4 mt-1">
                      <b>
                        {data["periods"][campInfo[id].period]}
                      </b>
                    </h3>
                    <p className="mt-1 mb-1">
                      {campInfo[id]?.start}-{campInfo[id]?.end} ({campInfo[id]?.days} {data["days"]})
                    </p>
                  </CardBody>
                </Card>
              </a>
            </Col>))}
          </Row>
        </Container>
      </div>
    </div>
  </DocumentMeta>);
}

export default Camps;
