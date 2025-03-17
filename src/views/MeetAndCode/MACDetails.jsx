import React from "react";
import { Col } from "reactstrap";

const MACDetails = ({ data, classInfo }) => {
  return (
    <Col md={7} className="mb-5 mt-4 mr-4">
      <h1>{classInfo.title}</h1>
      <img
        src={require(`../../assets/img/meet_and_code/${classInfo.image}`).default}
        alt={classInfo.title}
        className="img-fluid rounded mb-4 mt-3 img-thumbnail mx-auto d-block"
        style={{ width: "75%", height: "auto" }}
      />
      <h3>{data?.practical_details}</h3>
      <ul>
        <li>
          <p>
            <b style={{ fontWeight: "1000" }}>{data?.where}?</b> {classInfo.practical_details.address}
          </p>
        </li>
        <li>
          <p>
            <b style={{ fontWeight: "1000" }}>{data?.how}?</b> {data?.how_get_there}{" "}
            <a
              href="https://www.google.com/maps/dir//ilplatform/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x47c3c36355af9639:0xbd0b793d77cf1382?sa=X&ved=2ahUKEwih7L3k9IiBAxXO1gIHHT5YDMwQ9Rd6BAg2EAA&ved=2ahUKEwih7L3k9IiBAxXO1gIHHT5YDMwQ9Rd6BAhIEAU"
              target="_blank"
              rel="noreferrer noopener"
            >
              Google Maps
            </a>
            .
          </p>
        </li>
        <li>
          <p>
            <b style={{ fontWeight: "1000" }}>{data?.when}?</b> {classInfo.practical_details.dates}
          </p>
        </li>
        <li>
          <p>
            <b style={{ fontWeight: "1000" }}>{data?.who}?</b> {classInfo.practical_details.age_group}
          </p>
        </li>
        <li>
          <p>
            <b style={{ fontWeight: "1000" }}>Prix?</b> {classInfo.practical_details.price}
          </p>
        </li>
      </ul>
      <h3>{data?.description}</h3>
      <p>
        {classInfo.description.split("\n").map((text, index) => (
          <span key={index}>
            {text}
            <br />
          </span>
        ))}
      </p>
    </Col>
  );
};

export default MACDetails;
