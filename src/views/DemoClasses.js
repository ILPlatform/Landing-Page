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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import ReactDatetime from 'react-datetime';
import useData from 'data';
import ImgNextGen from 'components/ImgNextGen';
import demoClasses from 'data/demo.json';
import { handleDemoRegistration } from 'Helpers/handleVerification';
import { useHistory } from 'react-router-dom';

const FormGroupInput = ({ idx, data, info, setInfo, error }) => (
  <FormGroup className={error[idx] && `has-danger`}>
    <Input
      placeholder={data?.signup[idx]}
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

function DemoClasses() {
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    phone: '',
    name_child: '',
    birthday: '',
    selected: '',
  });
  const [error, setError] = useState({});
  const data = useData('demo')[0];
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  return (
    <>
      <div className="wrapper mt-5 pt-5">
        <Container>
          <Row className="align-items-center">
            <h1 className="mx-auto mb-4 mt-1">{data?.title}</h1>

            <Col className="ml-auto" lg="8" md="6" sm="7" xs="12">
              <ImgNextGen
                src={'demo/Coding_Banner'}
                alt="ILPlatform Register"
                width="100%"
                className="img-thumbnail"
              />
              <p>{data?.info?.general}</p>
              <ul>
                <li className="my-2">
                  <b>{data?.info?.where}</b> {data?.locations?.regent?.long}
                </li>
                <li className="my-2">
                  <b>{data?.info?.whom[0]}</b> {data?.info?.whom[1]}
                </li>
                <li className="my-2">
                  <b>{data?.info?.when[0]}</b> {data?.info?.when[1]}
                </li>
                <li className="my-2">
                  <b>{data?.info?.long[0]}</b> {data?.info?.long[1]}
                </li>
                <li className="my-2">
                  <b>{data?.info?.price[0]}</b> {data?.info?.price[1]}
                </li>
              </ul>
            </Col>

            <Col className="mr-auto" lg="4" md="6" sm="5" xs="12">
              <Card
                className="p-4 card card-plain"
                style={{ backgroundColor: 'lightgray' }}
              >
                <CardTitle className="text-center mb-3 pt-0" tag="h3">
                  {data?.signup?.title}
                </CardTitle>
                <Form>
                  {['name_child', 'email', 'phone'].map((idx, i) => (
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
                          placeholder: data?.signup?.birthday,
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

                  <FormGroup>
                    <Dropdown isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
                      <DropdownToggle
                        caret
                        className="w-100 bg-white text-secondary"
                        outline={true}
                      >
                        {customerInfo?.selected
                          ? customerInfo?.selected
                          : data?.signup?.demosession}
                      </DropdownToggle>
                      <DropdownMenu>
                        {demoClasses.map((demo) => (
                          <DropdownItem
                            onClick={() =>
                              setCustomerInfo({
                                ...customerInfo,
                                selected: demo,
                              })
                            }
                          >
                            {demo}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                    {error['selected'] && (
                      <div className="form-control-feedback text-danger ml-2">
                        {error['selected']}
                      </div>
                    )}
                  </FormGroup>

                  <Button
                    block
                    className="btn-round mt-4"
                    color="default"
                    onClick={(e) =>
                      handleDemoRegistration(e, setError, customerInfo, history)
                    }
                  >
                    {data?.signup?.signup}
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default DemoClasses;
