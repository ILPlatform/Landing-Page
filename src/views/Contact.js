import useData from 'data';
import React, {useState} from 'react';
import {useHistory} from 'react-router';
import {Button, Card, CardBody, CardTitle, Col, Container, Form, FormGroup, Input, Row,} from 'reactstrap';
import Social from 'components/Social';
import Visit from "../components/Visit";
import DocumentMeta from 'react-document-meta';
import {callFunction} from "../firebase";
import {GrMailOption} from "react-icons/gr";

function Contact() {
  const data = useData()?.contact;
  const meta = {
    title: data?.page_title,
    description: data?.page_description,
    canonical: `https://www.ilplatform.be/contact/`,
    meta: {
      property: {
        'og:title': data?.page_title,
        'twitter:title': data?.page_title,
        'og:description': data?.page_description,
        'og:image': require("../assets/img/contact/Background_Code.jpeg").default,
        'og:site_name': 'ILPlatform',
        'og:type': 'website',
        'og:locale': 'fr',
        'og:url': `https://www.ilplatform.be/contact/`
      }
    }
  };
  
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [sent, setSent] = useState(true);
  const history = useHistory();
  
  const handleChange = (e, field) => {
    e.preventDefault();
    setInfo({
      ...info,
      [field]: e.target.value,
    });
  };
  
  const displayError = (idx) =>
    error[idx] && (
      <div className="form-control-feedback text-danger ml-2">{error[idx]}</div>
    );
  
  const verifyData = (data, setError) => {
    setError({});
    let errors = {};
    const addError = (key, err) => (errors[key] = err);
    let valid = true;
    if (data.email !== undefined && !data.email) {
      valid = false;
      addError('email', 'Cannot be empty');
    }
    setError(errors);
    return valid
  }
  
  const contactVerification = (e) => {
    e.preventDefault();
    if (verifyData(info, setError)) {
      setLoading(true);
      callFunction('landing-newContact')(data).then(() => setSent(true));
    }
  };
  
  return (
    <DocumentMeta {...meta}>
      <div className="main">
        <div className="section section-light">
          <Container className="mt-5 pt-5">
            <Row>
              <Col className="mx-auto text-center px-5" lg="12">
                <Card
                  className="card card-plain w-100 px-5"
                  style={{backgroundImage: "url(" + require("../assets/img/contact/Background_Code.jpeg").default + ")"}}
                >
                  <CardTitle className="text-center h2" tag="h1">
                    {data.title}
                  </CardTitle>
                  <Row>
                    <Col lg={6}>
                      <div className={"mt-5 mb-4 mx-auto"}>
                        {/*<h3 className="title">*/}
                        {/*  <small>{data.subtitle}</small>*/}
                        {/*</h3>*/}
                        <Social/>
                      </div>
                      <div className={""}>
                        {/*<h3 className="title">*/}
                        {/*  <small>{data.visit}</small>*/}
                        {/*</h3>*/}
                        <Visit/>
                      </div>
                    </Col>
                    <Col lg={6} className={"m-0"}>
                      {!sent ? <><h2 className="title h3">
                        <small>{data.alternative}</small>
                      </h2>
                        <Form className="contact mb-5">
                          <FormGroup className={error.name && `has-danger`}>
                            <Input
                              placeholder={data.name}
                              type="text"
                              className="m-2"
                              value={info.name}
                              onChange={(e) => handleChange(e, 'name')}
                            />
                            {displayError('name')}
                          </FormGroup>
                          <FormGroup className={error.email && `has-danger`}>
                            <Input
                              placeholder={data.email}
                              type="text"
                              className="m-2"
                              value={info.email}
                              onChange={(e) => handleChange(e, 'email')}
                            />
                            
                            {displayError('email')}
                          </FormGroup>
                          <FormGroup className={error.phone && `has-danger`}>
                            <Input
                              placeholder={data.phone}
                              type="text"
                              className="m-2"
                              value={info.phone}
                              onChange={(e) => handleChange(e, 'phone')}
                            />
                            {displayError('phone')}
                          </FormGroup>
                          <FormGroup className={error['message'] && `has-danger`}>
                            <Input
                              placeholder={data['message']}
                              rows="7"
                              type="textarea"
                              className="m-2"
                              value={info['message']}
                              onChange={(e) => handleChange(e, 'message')}
                            />
                            {displayError('message')}
                          </FormGroup>
                          <Row>
                            <Col className="ml-auto mr-auto" md="6">
                              <Button
                                block
                                className="btn-round m-2"
                                color="secondary"
                                disabled={loading}
                                onClick={
                                  contactVerification
                                }
                              >
                                {!loading ? (
                                  data.send
                                ) : (
                                  <img
                                    src={
                                      require('assets/img/photo_swipe/preloader.gif')
                                        .default
                                    }
                                    alt="ILPlatform Loader"
                                  />
                                )}
                              </Button>
                            </Col>
                          </Row>
                        </Form></> :
                        <><GrMailOption size="40%" color="green" className="mx-auto mt-5"/>
                        <h2>
                          <b>{data?.success?.title}</b>
                        </h2>
                        <p>
                          <p className="h5">{data?.success?.subtitle}</p>
                          {/*<div className="social mt-4">*/}
                          {/*  <Social/>*/}
                          {/*</div>*/}
                          
                          <a href="/">
                            <Button block className="btn-round mt-5">
                              {data?.success?.back}
                            </Button>
                          </a>
                        </p></>}
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col lg={2}/>
            </Row>
          </Container>
        </div>
      </div>
    </DocumentMeta>
  );
}

export default Contact;
