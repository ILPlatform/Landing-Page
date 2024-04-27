import React, {useEffect} from 'react';
import {Card, CardBody, CardImg, Col, Container, Row, Button} from 'reactstrap';
import {useScrollTop} from 'Helpers';
import useData from 'data';
import Tools from "../components/Tools";
import {v4} from "uuid";
import DocumentMeta from 'react-document-meta';
import ImageWebp from "../components/ImageWebp";
import {useParams} from "react-router-dom";
import campInfo from 'data/camps.json';
import schools from 'data/schools.json';
import "./CampsSub.css";

function CampsSub() {
  let {id} = useParams();
  useScrollTop();
  const data = useData()?.information?.camps;
  const meta = {
    title: data?.page_title,
    description: data?.page_description,
    canonical: `https://www.ilplatform.be/camps/${id}`,
    meta: {
      property: {
        'og:title': data?.page_title,
        'twitter:title': data?.page_title,
        'og:description': data?.page_description,
        'og:image': require('../assets/img/programme/ILPlatform_Books.png').default,
        'og:site_name': 'ILPlatform',
        'og:type': 'website',
        'og:locale': 'fr',
        'og:url': `https://www.ilplatform.be/camps/${id}`
      }
    }
  };
  
  return (<DocumentMeta {...meta}>
    <div className="wrapper mt-5 pt-5">
      <Container className="text-center">
        <h1>{data?.periods[campInfo[id]?.period]}</h1>
        <h2 className="mt-0 h3">{campInfo[id]?.start}-{campInfo[id]?.end}, {campInfo[id]?.days} {data["days"]} {campInfo[id]?.not && `(${data?.sub?.not} ${campInfo[id]?.not})`}</h2>
        {/* <p className="h5">(<b className="bolder">Attention:</b> Pas de cours le {campInfo[id]?.not})</p> */}
      </Container>
      
      {/* Different Camp Weeks */}
      <div className="section section-light text-center">
        <Container className="align-items-stretch">
          <Row className="pt-2 justify-content-center d-flex">
            {/*<Col lg={2}/>*/}
            
            {campInfo[id]?.camps ? campInfo[id]?.camps?.map(camp => (
            <div className="col my-3 col-md-4">
            <div className={`p-2 pt-0 camp-section w-100 h-100 d-flex justify-content-between flex-column`}>
              <div>
                <div className="text-left">
                  <h3 className="h5 mx-3 mt-2">
                    <b className="h5 boldest font-size-18">{data?.activities[camp?.title]}</b> <i>{data?.sub?.with} {camp?.partner}</i>
                    <ul className="mt-2 ml-0 pl-4">
                    <li><b className="bolder">{data?.sub?.age}:</b> {camp?.age} {data?.sub?.years}</li>
                      {/* <li><b className="bolder">{data?.sub?.partner}</b>:  </li> */}
                      <li><b className="bolder">{data?.sub?.address}</b>: {schools[camp?.school]}</li>
                      {/* <li><b className="bolder">{data?.sub?.price}</b>: </li> */}
                    </ul>
                  </h3>
                </div>
              </div>
              {camp?.register && <a href={camp?.register} target="_blank" className="d-flex justify-content-end p-2">
                <Button className="justify-content-center mx-auto w-100">
                  {data?.sub?.register} ({camp?.price})
                </Button>
              </a>}
              {camp?.registers && <div className="row justify-content-end p-2">
                {Object.keys(camp?.registers)?.map(key => (<a className="col" href={camp?.registers[key]} target="_blank">
                  <Button className="justify-content-center w-100">
                    {key} {data?.sub?.years}, {camp?.price}
                  </Button>
                </a>))}
              </div>}
            </div>
          </div>
          )): 
          <p className="h5 w-75">{data?.sub?.sorry}</p>}
          </Row>
        </Container>
      </div>
    </div>
  </DocumentMeta>);
}

export default CampsSub;
