import React, { useState } from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Input,
  InputGroup,
} from 'reactstrap';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

import useData from 'data';

const MailchimpSubscribeForm = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState();
  const submit = () =>
    email &&
    email.indexOf('@') > -1 &&
    onValidated({
      EMAIL: email,
    });

  return (
    <Form>
      {status === 'success' ||
        (status === 'error' && (
          <div
            style={{ color: status === 'success' ? 'green' : 'red' }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        ))}
      <InputGroup>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          onClick={submit}
          disabled={status === 'sending' || status === 'success'}
          color={
            status === 'success'
              ? 'success'
              : status === 'error'
              ? 'danger'
              : 'default'
          }
        >
          Submit
        </Button>
      </InputGroup>
    </Form>
  );
};

function FooterAboutUs() {
  const data = useData('footer');
  const url =
    'https://ilplatform.us20.list-manage.com/subscribe/post?u=072ca7cb38917f94c7fb1bfe9&amp;id=98bb038e35';

  return (
    <>
      <footer className="footer footer-big footer-black">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" md="9" sm="9" xs="12">
              <Row>
                <Col md={6}>
                  <div className="links">
                    <ul className="uppercase-links stacked-links">
                      <li>
                        <a href="/">{data['home']}</a>
                      </li>
                      <li>
                        <a href="/about-us/">{data['about-us']}</a>
                      </li>
                      <li>
                        <a href="/classes/">{data['classes']}</a>
                      </li>
                      <li>
                        <a href="/contact-us/">{data['contact-us']}</a>
                      </li>
                    </ul>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="social-area text-center">
                    <a
                      href="https://www.facebook.com/ILPlatform"
                      target="_blank"
                      rel="noreferrer"
                      className="mx-3"
                    >
                      <Button
                        className="btn-just-icon btn-round mr-1"
                        color="facebook"
                      >
                        <i className="fa fa-facebook" />
                      </Button>
                    </a>
                    <a
                      href="https://www.instagram.com/ilplatform/"
                      target="_blank"
                      rel="noreferrer"
                      className="mx-3"
                    >
                      <Button
                        className="btn-just-icon btn-round mr-1"
                        color="instagram"
                      >
                        <i className="fa fa-instagram" />
                      </Button>
                    </a>
                  </div>
                  <MailchimpSubscribe
                    url={url}
                    render={({ subscribe, status, message }) => (
                      <div>
                        <MailchimpSubscribeForm
                          url={url}
                          status={status}
                          message={message}
                          onValidated={(formData) => subscribe(formData)}
                        />
                      </div>
                    )}
                  />
                </Col>
              </Row>
              <hr />
              <div className="copyright">
                <div className="pull-left">
                  © {new Date().getFullYear()} Independent Learning Platform
                  ASBL
                </div>
                <div className="links pull-right">
                  <ul>
                    <li className="mr-1">
                      <a href="/privacy/">{data['privacy']}</a>
                    </li>
                    |{' '}
                    <li className="mr-1">
                      <a href="/terms/">{data['terms']}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default FooterAboutUs;
