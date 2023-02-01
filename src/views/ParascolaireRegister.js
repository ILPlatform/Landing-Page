import React, {useContext, useState} from 'react';
import {
  Button,
  Card,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';
import ReactDatetime from 'react-datetime';
import {registrationParascolaireVerification} from 'Helpers/handleVerification';
import useData from 'data';
import {Context} from "../Context";

const FormGroupInput = ({idx, data, info, setInfo, error}) => (
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

function ParascolaireRegister(props) {
  const {id, type} = props.match.params;
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    name_child: '',
    birthday: '',
    class: ''
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const state = useContext(Context)[0];
  const data = useData(id);
  const dataParaDetails = data?.products?.parascolaire?.details
  const dataParaReg = data?.products?.parascolaire?.register
  const dataPara = data?.id_specific
  
  return (
    <>
      <div className="wrapper mt-5 pt-5">
        <Container>
          <Row className="align-items-center">
            <Col className="mr-auto" lg="6" md="6" sm="5" xs="12">
              <Card
                className="p-4 card card-plain"
                style={{backgroundColor: 'lightgray'}}
              >
                <CardTitle className="text-center mb-3" tag="h2">
                  {dataParaDetails?.register}
                </CardTitle>
                <Form>
                  {['name_child', 'email', 'phone', 'class'].map((idx, i) => (
                    <FormGroupInput
                      idx={idx}
                      data={data?.products?.parascolaire?.register}
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
                          placeholder: dataParaReg?.birthday,
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
                            <i className="fa fa-calendar"/>
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
                    disabled={loading || dataPara?.full}
                    onClick={(e) =>
                      registrationParascolaireVerification(
                        e,
                        setError,
                        customerInfo,
                        {type, id},
                        setLoading,
                        dataPara,
                        state.language
                      )
                    }
                  >
                    {!loading ? (
                      dataPara?.full ? dataParaReg?.full : dataParaReg?.continue
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
                    src={require(`assets/img/classes/ILPlatform_Parascolaires.png`).default}
                    alt="ILPlatform Register"
                    width="100%"
                    className="img-thumbnail"
                  />
                  <ul>
                    <p>
                      <li className="my-2">
                        <b>{dataParaDetails?.who}</b> {`${dataParaDetails?.students[0]} ${dataParaDetails?.classes[dataPara?.ages[0]]} ${dataParaDetails?.students[1]} ${dataParaDetails?.classes[dataPara?.ages[1]]} ${dataParaDetails?.students[2]}`}
                      </li>
                    </p>
                    <p>
                      <li className="my-2"><b>{dataParaDetails?.where}</b> {data?.locations[dataPara?.where]?.long}</li>
                    </p>
                    <p>
                      <li className="my-2">
                        <b>{dataParaDetails?.when}</b> {`${dataParaDetails?.time[0]} ${data?.general?.days[dataPara?.when[0]]} ${dataPara?.when[1]}, ${dataParaDetails?.time[2]} ${dataPara?.when[2]} ${dataParaDetails?.time[3]} ${dataPara?.when[3]}`}
                      </li>
                    </p>
                    <p>
                      <li className="my-2">
                        <b>{dataParaDetails?.price}</b> {`${dataPara?.price[0]}€ ${dataParaDetails?.prices[0]} ${dataPara?.price[1]} ${dataParaDetails?.prices[1]}`}
                      </li>
                    </p>
                  </ul>
                </>}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ParascolaireRegister;
