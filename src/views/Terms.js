import React from 'react';
import useData from 'data';
import { useScrollTop } from 'Helpers';
import { Col } from 'reactstrap';
import { v4 } from 'uuid';

const Terms = () => {
  useScrollTop();
  const data = useData('terms');

  return (
    <Col className="section mx-auto" lg={6} md={8} xs={10}>
      <h2 className="my-5 text-center">
        <b>{data?.title}</b>
      </h2>

      {data?.sections?.map(({ title, content }) => (
        <div key={v4()}>
          <h3 className="mb-3">
            <b>{title}</b>
          </h3>
          {content?.map((content) => (
            <p key={v4()}>{content}</p>
          ))}
        </div>
      ))}
    </Col>
  );
};

export default Terms;
