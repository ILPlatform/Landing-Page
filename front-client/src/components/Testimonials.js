import React from "react";

import {
    Card,
    CardBody,
    Container,
    Row,
    Col
} from "reactstrap";
import useData from 'data';

function SectionTestimonials() {
    const data = useData()?.information?.testimonials;
    return (
        <div className="section section-gray text-center my-0 pt-0">
            {/* <div
                className="section section-testimonials cd-section my-0 py-0"
                id="testimonials"
            > */}
            {/* ********* TESTIMONIALS 3 ********* */}
            <div className="testimonials-3 py-0">
                <Container className="justify-content-center">
                    <Row>
                        <Col className="ml-auto mr-auto text-center" md="6">
                            <h2 className="h3 title">{data?.title}</h2>
                            <p className="h5 mb-5">{data?.desc}</p>
                        </Col>
                    </Row>
                    <Row style={{ justifyContent: "center" }}>
                        {data?.items?.map(({ name, src, desc, color, size }) => <Col md={size}>
                            <Card data-background="color" data-color={color}>
                                <CardBody>
                                    <div className="author">
                                        <img
                                            alt="..."
                                            className="avatar img-raised mr-2"
                                            src={require(`assets/img/faces/${src}.png`).default}
                                        />
                                        <span>{name}</span>
                                    </div>
                                    <span className="category-social pull-right">
                                        <i className="fa fa-quote-right" />
                                    </span>
                                    <div className="clearfix" />
                                    <p className="card-description">
                                        {desc}
                                    </p>
                                </CardBody>
                            </Card>
                        </Col>)}
                    </Row>
                </Container>
            </div>
            {/* ********* END TESTIMONIALS 3 ********* */}
            {/* </div> */}
        </div>
    );
}

export default SectionTestimonials;