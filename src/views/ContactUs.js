import { handleVerification2 } from 'Helpers/handleVerification';
import useData from 'data';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {
  Button,
  Form,
  Input,
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  FormGroup,
} from 'reactstrap';
import Social from 'components/Social';

function ContactUs() {
  const data = useData('contact-us')[0];

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    first: '',
    last: '',
    email: '',
    subject: '',
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
              <Col lg={2} />
              <Col className="mx-auto text-center" lg="8">
                <Card
                  className="card card-plain w-100"
                  style={{ backgroundColor: 'lightgray' }}
                >
                  <CardTitle className="text-center" tag="h2">
                    {data.title}
                  </CardTitle>
                  <div>
                    <h3 className="title">
                      <small>{data.subtitle}</small>
                    </h3>
                    <Social />
                  </div>
                  <h3 className="title">
                    <small>{data.alternative}</small>
                  </h3>
                  <Form className="contact mx-5 mb-5">
                    <Row>
                      <Col md="6">
                        <FormGroup className={error.first && `has-danger`}>
                          <Input
                            placeholder={data.first}
                            type="text"
                            className="m-2"
                            value={info.first}
                            onChange={(e) => handleChange(e, 'first')}
                          />
                          {displayError('first')}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className={error.last && `has-danger`}>
                          <Input
                            placeholder={data.last}
                            type="text"
                            className="m-2"
                            value={info.last}
                            onChange={(e) => handleChange(e, 'last')}
                          />

                          {displayError('last')}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
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
                      </Col>
                      <Col md="6">
                        <FormGroup className={error.subject && `has-danger`}>
                          <Input
                            placeholder={data.subject}
                            type="text"
                            className="m-2"
                            value={info.subject}
                            onChange={(e) => handleChange(e, 'subject')}
                          />
                          {displayError('subject')}
                        </FormGroup>
                      </Col>
                    </Row>
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
                            handleVerification2(
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
                </Card>
              </Col>
              <Col lg={2} />
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
