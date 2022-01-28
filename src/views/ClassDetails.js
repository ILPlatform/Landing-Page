import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useScrollTop } from 'Helpers';
import useData from 'data';
import { v4 } from 'uuid';
import Loader from 'components/Loader';

function ClassDetails(props) {
  const { id, type } = props.match.params;
  useScrollTop();
  const [data, loading] = useData('classdetails', { id });
  const [infoDescs, setInfoDescs] = useState();

  useEffect(() => {
    if (data?.loc) {
      setInfoDescs([
        data?.public
          ?.replace('#0', data?.ages?.from)
          .replace('#1', data?.ages?.to),
        data?.locations[data?.loc]?.long,
        type === 'onsite'
          ? `${data?.days[data?.day]}, ${data?.time?.start}-${data?.time?.end}`
          : `${data?.days?.start} - ${data?.days?.end}, ${data?.time?.start}-${data?.time?.end}`,
        data?.languages?.map(
          (language, i) =>
            data?.languageList[language] +
            (i !== data?.languages?.length - 1 ? ' & ' : '')
        ),
        type === 'onsite'
          ? data?.priceText
              ?.replace('#0', data?.price?.amount)
              .replace('#1', data?.price?.classes)
          : data?.price?.amount + '€',
      ]);
    }
  }, [data, type]);

  return (
    <>
      <div className="wrapper mt-5 pt-5">
        <div className="section text-center">
          <Container>
            <Row className="justify-content-center align-items-center">
              <Col className="text-left" lg={6} md={7}>
                <h2 className="mb-4">
                  <b>{data?.title}</b>
                </h2>
                <br />
                <h5>
                  <ul>
                    {!loading ? (
                      data?.info?.map((title, i) => (
                        <li className="my-2" key={v4()}>
                          <b>{data?.info[i]}</b> {infoDescs && infoDescs[i]}
                        </li>
                      ))
                    ) : (
                      <Loader />
                    )}
                  </ul>
                </h5>
              </Col>
              <Col lg={4} md={5}>
                {!loading ? (
                  <img
                    src={data?.img}
                    alt="ILPlatform Classes"
                    className="img-thumbnail"
                  />
                ) : (
                  <Loader />
                )}
              </Col>
            </Row>
            <br />
            <Row className="justify-content-center">
              <Col lg={10} md={12} className="text-left">
                <h2 className="text-center">
                  <b>{data?.detailsTitle}</b>
                </h2>
                <br />
                {!loading ? (
                  type === 'onsite' &&
                  data['module-details'][data?.details]?.map((det) => (
                    <h5 key={v4()}>{det}</h5>
                  ))
                ) : (
                  <Loader />
                )}
                {!loading ? (
                  type === 'camps' &&
                  data['camp-details'][data?.loc]?.map((det) => (
                    <h5 key={v4()}>{det}</h5>
                  ))
                ) : (
                  <Loader />
                )}
              </Col>
            </Row>
            <br />
            {type === 'onsite' && (
              <>
                <br />
                <Row className="justify-content-center align-items-center">
                  <Col lg={6} md={7} className="text-left">
                    <h2 className="text-center">
                      <b>{data?.exampleTitle}</b>
                    </h2>
                    <br />
                    {!loading ? (
                      data['example-projects'][data?.example]?.text?.map(
                        (ex) => <h5 key={v4()}>{ex}</h5>
                      )
                    ) : (
                      <Loader />
                    )}
                  </Col>
                  <Col lg={4} md={5}>
                    {!loading ? (
                      <img
                        src={data['example-projects'][data?.example]?.img}
                        alt="ILPlatform Example Project"
                        width="100%"
                        className="img-thumbnail"
                      />
                    ) : (
                      <Loader />
                    )}
                  </Col>
                </Row>
                <br /> <br />
              </>
            )}
            <br /> <br />
            <Row className="justify-content-center">
              <Col lg={6} md={8} xs={10}>
                <a href={`/classes/${type}/${id}/register`}>
                  <Button className="w-100 btn-round" color="success">
                    {data?.register}
                  </Button>
                </a>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ClassDetails;
