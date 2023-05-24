import React, {useEffect} from 'react';
import {Col, Container, Row} from 'reactstrap';
import {useScrollTop} from 'Helpers';
import useData from 'data';
import {useParams} from "react-router-dom";
import {v4} from "uuid";
import ImageWebp from "../components/ImageWebp";
import DocumentMeta from 'react-document-meta';

function ProgrammeSub() {
  let {id} = useParams();
  useScrollTop();
  const data = useData()?.information?.programme?.groups[id];
  const meta = {
    title: data?.page_title,
    description: data?.page_description,
    canonical: `https://www.ilplatform.be/programme/${id}/`,
    meta: {
      property: {
        'og:title': data?.page_title,
        'twitter:title': data?.page_title,
        'og:description': data?.page_description,
        'og:image': require(`../assets/img/programme/ILPlatform_Programme${id}.png`).default,
        'og:site_name': 'ILPlatform',
        'og:type': 'website',
        'og:locale': 'fr',
        'og:url': `https://www.ilplatform.be/programme/${id}/`
      }
    }
  };
  
  return (<DocumentMeta {...meta}>
    <div className="wrapper mt-5 pt-5">
      <Container className="text-center">
        <h1>{data?.title}</h1>
      </Container>
      
      {/* First Section */}
      <div className="section section-light text-center">
        <Container className="text-center">
          
          <Row className="align-items-center">
            <Col className="mx-auto" xs="12" lg="8">
              <p className="h5 text-left">
                {data?.content1}
              </p>
            </Col>
            <Col className="mx-auto my-1" xs={10} md={4} style={{height: "auto"}}>
              <ImageWebp
                srcWebp={require(`../assets/img/programme/ILPlatform_Programme${id}.webp`).default}
                src={require(`../assets/img/programme/ILPlatform_Programme${id}.png`).default}
                alt={"ILPlatform Programme 1"}
                width="100%" className="img-thumbnail"/>
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* Second Section */}
      <div className="section section-light text-center">
        <Container className="text-center">
          
          <Row className="align-items-center">
            <Col className="mx-auto" xs="12" lg="6">
              <h2 className="h3 title">{data?.title2}</h2>
              {/*<h5 className="text-center">*/}
              {/*<ul>*/}
              {data?.content2?.map(ele => <h3 className={"p"} key={v4()} className="lead">{ele}</h3>)}
              {/*</ul>*/}
              {/*</h5>*/}
            </Col>
            <Col className="mx-auto my-1" xs={12} md={6}>
              <h2 className="h3 title">{data?.title3}</h2>
              <p className="text-center">
                {data?.content3?.map(ele => <img key={v4()}
                                                 src={require(`../assets/img/programme/${ele}`).default}
                                                 alt={"ILPlatform Programme"}
                                                 width="30%"
                                                 className="m-2"
                />)}
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  </DocumentMeta>);
}

export default ProgrammeSub;
