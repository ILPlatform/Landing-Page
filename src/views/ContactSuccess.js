import React from "react";
import {
  Button,
  Card,
  CardTitle,
  Container,
  Row,
  Col,
  CardBody,
} from "reactstrap";
import { useScrollTop } from "../Helpers";
import { GrMailOption } from "react-icons/gr";
import useData from "../data";
import Social from "../components/Social";

function ContactSuccess() {
  useScrollTop();
  const data = useData()?.contact?.success;

  return (
    <>
      <div className="wrapper mt-5 pt-5">
        <Container>
          <Row className="align-items-center">
            <Col className="mx-auto text-center" lg="6" md="6" sm="5" xs="12">
              <Card className="p-4" style={{ backgroundColor: "lightgray" }}>
                <GrMailOption size="40%" color="green" className="mx-auto" />
                <CardTitle className="text-center" tag="h2">
                  <b>{data.title}</b>
                </CardTitle>
                <CardBody>
                  <h5>{data.subtitle}</h5>
                  <div className="social mt-4">
                    <Social />
                  </div>

                  <a href="/">
                    <Button block className="btn-round mt-5">
                      {data.back}
                    </Button>
                  </a>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ContactSuccess;
