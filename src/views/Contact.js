import {contactVerification} from 'Helpers/handleVerification';
import useData from 'data';
import React, {useState} from 'react';
import {useHistory} from 'react-router';
import {Button, Card, CardTitle, Col, Container, Form, FormGroup, Input, Row,} from 'reactstrap';
import Social from 'components/Social';
import Visit from "../components/Visit";

function Contact() {
  const data = useData()?.contact;
  
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
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
  
  return (
    <>
      <div className="main">
        <div className="section section-light">
          <Container className="mt-5 pt-5">
            <Row>
              <Col className="mx-auto text-center px-5" lg="12">
                <Card
                  className="card card-plain w-100 px-5"
                  style={{backgroundImage: "url(" + require("../assets/img/contact/Background_Code.png").default + ")"}}
                >
                  <CardTitle className="text-center" tag="h2">
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
                      <h3 className="title">
                        <small>{data.alternative}</small>
                      </h3>
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
                              onClick={(e) =>
                                contactVerification(
                                  e,
                                  setError,
                                  info,
                                  setLoading,
                                  history
                                )
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
                      </Form>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col lg={2}/>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Contact;
