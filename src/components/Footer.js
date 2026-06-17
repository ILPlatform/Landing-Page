import React from "react";
import { Col, Container, Row } from "reactstrap";

import useData from "../data";
import Social from "./Social";

function Footer() {
  const data = useData()?.navigation;

  return (
    <footer className="footer footer-big footer-black">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" md="9" sm="9" xs="12">
            <Row>
              <Col md={4} className="text-center text-md-left">
                <div className="links">
                  <ul className="uppercase-links stacked-links text-center text-md-left">
                    <li>
                      <p>
                        <a href="/">{data["home"]}</a>
                      </p>
                    </li>
                    <li>
                      <p>
                        <a href="/about/">{data["about-us"]}</a>
                      </p>
                    </li>
                    <li>
                      <p>
                        <a href="/partners/">{data["partners"]}</a>
                      </p>
                    </li>
                    <li>
                      <p>
                        <a href="/camps/" rel="nofollow">
                          {data["classes"]}
                        </a>
                      </p>
                    </li>
                    <li>
                      <p>
                        <a href="/contact/">{data["contact-us"]}</a>
                      </p>
                    </li>
                  </ul>
                </div>
              </Col>

              <Col md={4} className="text-center text-md-left">
                <div className="links">
                  <ul className="uppercase-links stacked-links text-center text-md-left">
                    <li>
                      <p>
                        Bd du Régent 54A, <br />
                        1000 Bruxelles
                      </p>
                    </li>
                    <li>
                      <p>
                        <a href="mailto:info@ilplatform.be">
                          info@ilplatform.be
                        </a>
                      </p>
                    </li>
                    <li>
                      <p>
                        <a href="tel:+32 470 87 74 29">+32 470 87 74 29</a>
                      </p>
                    </li>
                  </ul>
                </div>
              </Col>

              <Col md={4}>
                <div className="social-area text-center">
                  <Social spacedOut={false} />
                </div>
              </Col>
            </Row>
            <hr style={{ borderColor: "#66615b" }} />
            <Row>
              <Col lg={7} sm={12} className="text-center text-lg-left">
                © {new Date().getFullYear()} Independent Learning Platform ASBL
              </Col>
              <Col className="links text-center text-lg-right" lg={5} sm={12}>
                <ul>
                  <li className="px-2">
                    <a href="/privacy/">{data["privacy"]}</a>
                  </li>
                  <li className="pr-0">|</li>
                  <li className="px-2">
                    <a href="/terms/">{data["terms"]}</a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
