import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardTitle,
  Form,
  Input,
  Container,
  Row,
  Col,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import ReactDatetime from 'react-datetime';
import { handleVerification } from 'Helpers';
import { Context } from 'Context';
import useData from 'data';
import { v4 } from 'uuid';
import Loader from 'components/Loader';

const FormGroupInput = ({ idx, data, info, setInfo, error }) => (
  <FormGroup className={error[idx] && `has-danger`}>
    <Input
      placeholder={data[idx]}
      type="text"
      value={info[idx]}
      className="form-control-danger"
      onChange={(e) =>
        setInfo({
          ...info,
          [idx]: e.target.value,
        })
      }
    />
    {error[idx] && <div className="form-control-feedback">{error[idx]}</div>}
  </FormGroup>
);

function Register(props) {
  const { id, type } = props.match.params;
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    name_child: '',
    birthday: '',
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, loadingContent] = useData('registration', {
    id,
  });
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
  }, [data]);

  return (
    <>
      <div className="wrapper mt-5 pt-5">
        <Container>
          <Row className="align-items-center">
            <Col className="mr-auto" lg="6" md="6" sm="5" xs="12">
              <Card
                className="p-4 card card-plain"
                style={{ backgroundColor: 'lightgray' }}
              >
                <CardTitle className="text-center mb-3" tag="h2">
                  {data?.register}
                </CardTitle>
                <Form>
                  {['name', 'email', 'phone', 'name_child'].map((idx, i) => (
                    <FormGroupInput
                      idx={idx}
                      data={data}
                      info={customerInfo}
                      setInfo={setCustomerInfo}
                      error={error}
                      key={i}
                    />
                  ))}
                  <FormGroup className={error['birthday'] && `has-danger`}>
                    <InputGroup className="date">
                      <ReactDatetime
                        inputProps={{
                          className: 'form-control',
                          placeholder: data.birthday,
                        }}
                        initialViewMode="years"
                        dateFormat="D/MM/YYYY"
                        timeFormat={false}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            birthday: new Date(e._d).toLocaleDateString(
                              'en-UK'
                            ),
                          })
                        }
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <span className="glyphicon glyphicon-calendar">
                            <i className="fa fa-calendar" />
                          </span>
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {error['birthday'] && (
                      <div className="form-control-feedback text-danger ml-2">
                        {error['birthday']}
                      </div>
                    )}
                  </FormGroup>

                  <Button
                    block
                    className="btn-round mt-4"
                    color="default"
                    disabled={loading}
                    onClick={(e) =>
                      handleVerification(
                        e,
                        setError,
                        customerInfo,
                        { type, id },
                        setLoading,
                        data?.price?.amount,
                        type
                      )
                    }
                  >
                    {!loading ? (
                      data.continue
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
                </Form>
              </Card>
            </Col>
            <Col className="ml-auto" lg="6" md="6" sm="7" xs="12">
              {!loadingContent ? (
                <>
                  <img
                    src={data.img}
                    alt="ILPlatform Register"
                    width="100%"
                    className="img-thumbnail"
                  />
                  <ul>
                    {data?.info?.map((title, i) => (
                      <p key={v4()}>
                        <li className="my-2">
                          <b>{data?.info[i]}</b> {infoDescs[i]}
                        </li>
                      </p>
                    ))}
                  </ul>
                </>
              ) : (
                <Loader />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Register;
