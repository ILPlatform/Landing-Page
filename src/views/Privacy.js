import React from "react";
import useData from "../data";
import { useScrollTop } from "../Helpers";
import { Col } from "reactstrap";
import { v4 } from "uuid";
import DocumentMeta from "react-document-meta";

const Privacy = () => {
  useScrollTop();
  const data = useData()?.boring?.privacy;

  const meta = {
    title: data?.page_title,
    description: data?.page_description,
    canonical: `https://www.ilplatform.be/privacy/`,
    meta: {
      property: {
        "og:title": data?.page_title,
        "twitter:title": data?.page_title,
        "og:description": data?.page_description,
        "og:site_name": "ILPlatform",
        "og:type": "website",
        "og:locale": "fr",
        "og:url": `https://www.ilplatform.be/privacy/`,
      },
    },
  };

  return (
    <DocumentMeta {...meta}>
      <Col className="section mx-auto" lg={6} md={8} xs={10}>
        <h1 className="h2 my-5 text-center">
          <b>{data?.title}</b>
        </h1>

        {data?.sections?.map(({ title, content }) => (
          <div key={v4()}>
            <h2 className="h3 mb-3">
              <b>{title}</b>
            </h2>
            {content?.map((content) => (
              <p key={v4()}>{content}</p>
            ))}
          </div>
        ))}
      </Col>
    </DocumentMeta>
  );
};

export default Privacy;
