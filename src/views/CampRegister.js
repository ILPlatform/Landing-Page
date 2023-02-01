import React, {useContext, useState} from 'react';
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
import {registrationCampVerification} from 'Helpers/handleVerification';
import useData from 'data';
import { v4 } from 'uuid';
import {Context} from "../Context";

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
    email: '',
    phone: '',
    name_child: '',
    birthday: '',
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const state = useContext(Context)[0];
  
  const data = useData(id);
  const dataCampDetails = data?.products?.camp?.details;
  const dataCamp = data?.id_specific;
  
  const infoDescs = [
    dataCampDetails?.public?.replace('#0', dataCamp?.ages?.from).replace('#1', dataCamp?.ages?.to),
    data?.locations[dataCamp?.loc]?.long,
    `${data?.weeks[dataCamp?.days]?.start} - ${data?.weeks[dataCamp?.days]?.end}, ${dataCamp?.time?.start}-${dataCamp?.time?.end}`, dataCamp?.languages?.map((language, i) => data?.general?.languageList[language] + (i !== dataCamp?.languages?.length - 1 ? ' & ' : '')),
    dataCamp?.price?.amount + '€'
  ];

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
                  {dataCampDetails?.register}
                </CardTitle>
                <Form>
                  {['name_child', 'email', 'phone'].map((idx, i) => (
                    <FormGroupInput
                      idx={idx}
                      data={data?.products?.camp?.register}
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
                          placeholder: data?.products?.camp?.register?.birthday,
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
                      registrationCampVerification(
                        e,
                        setError,
                        customerInfo,
                        id,
                        setLoading,
                        dataCamp,
                        data,
                        state.language
                      )
                    }
                  >
                    {!loading ? (
                      data?.products?.camp?.register?.continue
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
              {
                <>
                  <img
                    src={require(`assets/img/classes/${dataCampDetails[dataCamp?.loc][4]}`).default}
                    alt="ILPlatform Register"
                    width="100%"
                    className="img-thumbnail"
                  />
                  <ul>
                    {dataCampDetails?.info?.map((title, i) => (
                      <p key={v4()}>
                        <li className="my-2">
                          <b>{dataCampDetails?.info[i]}</b> {infoDescs[i]}
                        </li>
                      </p>
                    ))}
                  </ul>
                </>}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Register;
