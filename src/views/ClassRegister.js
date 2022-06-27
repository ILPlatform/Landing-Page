import React, { useState } from 'react';
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
import { registrationVerification } from 'Helpers/handleVerification';
import useData from 'data';
import { v4 } from 'uuid';

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

function ClassRegister(props) {
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
  
  const data = useData(id);
  const dataRegister = data?.register?.class;
  const dataClassDetails = data?.products?.class?.details;
  const dataClass = data?.id_specific;
  
  let infoDescs = [
      dataClassDetails?.public_level[dataClass?.level]?.replace('#0', dataClass?.ages[0]).replace('#1', dataClass?.ages[1]),
      data?.locations[dataClass?.loc]?.long,
      `${data?.general?.days[dataClass?.day]}, ${dataClass?.time?.start}-${dataClass?.time?.end}`,
      dataClass?.languages?.map((language, i) => data?.general?.languageList[language] + (i !== dataClass?.languages?.length - 1 ? ' & ' : '')),
      dataClassDetails?.price?.replace('#0', dataClass?.price[0])?.replace('#1', dataClass?.price[1])
    ]

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
                  {dataRegister?.register}
                </CardTitle>
                <Form>
                  {['name', 'email', 'phone', 'name_child'].map((idx, i) => (
                    <FormGroupInput
                      idx={idx}
                      data={dataRegister}
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
                          placeholder: dataRegister.birthday,
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
                      registrationVerification(
                        e,
                        setError,
                        customerInfo,
                        { type, id },
                        setLoading,
                        dataClass?.price?.amount,
                        type
                      )
                    }
                  >
                    {!loading ? (
                      dataRegister.continue
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
                <>
                  <img
                    src={require(`assets/img/classes/${dataClass?.img}`).default}
                    alt="ILPlatform Register"
                    width="100%"
                    className="img-thumbnail"
                  />
                  <ul>
                    {dataRegister?.info?.map((title, i) => (
                      <p key={v4()}>
                        <li className="my-2">
                          <b>{dataRegister?.info[i]}</b> {infoDescs[i]}
                        </li>
                      </p>
                    ))}
                  </ul>
                </>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ClassRegister;
