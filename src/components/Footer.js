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
import Social from './Social';

const MailchimpSubscribeForm = ({ data, status, message, onValidated }) => {
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
          {data?.submit}
        </Button>
      </InputGroup>
    </Form>
  );
};

function FooterAboutUs() {
  const data = useData('footer')[0];
  const url =
    'https://ilplatform.us20.list-manage.com/subscribe/post?u=072ca7cb38917f94c7fb1bfe9&amp;id=98bb038e35';

  return (
    <>
      <footer className="footer footer-big footer-black">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" md="9" sm="9" xs="12">
              <Row>
                <Col md={6} className="text-center text-md-left">
                  <div className="links">
                    <ul className="uppercase-links stacked-links text-center text-md-left">
                      <p>
                        <a href="/">{data['home']}</a>
                      </p>
                      <p>
                        <a href="/about-us/">{data['about-us']}</a>
                      </p>
                      <p>
                        <a href="/classes/">{data['classes']}</a>
                      </p>
                      <p>
                        <a href="/contact-us/">{data['contact-us']}</a>
                      </p>
                    </ul>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="social-area text-center">
                    <Social />
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
                          data={data}
                        />
                      </div>
                    )}
                  />
                </Col>
              </Row>
              <hr style={{ borderColor: '#66615b' }} />
              <Row>
                <Col lg={7} sm={12} className="text-center text-lg-left">
                  © {new Date().getFullYear()} Independent Learning Platform
                  ASBL
                </Col>
                <Col className="links text-center text-lg-right" lg={5} sm={12}>
                  <ul>
                    <li className="px-2">
                      <a href="/privacy/">{data['privacy']}</a>
                    </li>
                    |
                    <li className="px-2">
                      <a href="/terms/">{data['terms']}</a>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default FooterAboutUs;
