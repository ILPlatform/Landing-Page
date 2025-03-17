import { useRef } from "react";
import useForm from "../dataHooks/useForm.js";
import useData from "../data";
import FormSuccess from "./FormSuccess.js";
import { Button, Col, FormGroup, Input, Row, Label } from "reactstrap";
import Loader from "./Loader.js";

const FORM_ENDPOINT =
  "https://public.herotofu.com/v1/330ae710-0bb6-11ee-8025-97a9fb2f29da";

const Form = () => {
  const data = useData()?.contact;

  const formElement = useRef(null);
  const additionalData = {
    sent: new Date().toISOString(),
  };

  const { handleSubmit, status, message } = useForm({
    form: formElement,
    additionalData,
  });

  if (status === "success") {
    return <FormSuccess />;
  }

  if (status === "error") {
    return (
      <>
        <div>Something bad happened!</div>
        <div>{message}</div>
      </>
    );
  }

  return (
    <form
      action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      method="POST"
      ref={formElement}
    >
      <FormGroup className={`text-left`}>
        <Label for="name" className="mb-0 ml-2 pb-0">
          {data.name}
        </Label>
        <Input
          placeholder="John Doe"
          name="name"
          type="text"
          className="mx-2 mt-0"
        />
      </FormGroup>
      <FormGroup className={`text-left`}>
        <Label for="email" className="mb-0 ml-2 pb-0">
          {data.email}
        </Label>
        <Input
          placeholder="john.doe@mail.com"
          name="email"
          type="text"
          className="mx-2 mt-0"
        />
      </FormGroup>
      <FormGroup className={`text-left`}>
        <Label for="phone" className="mb-0 ml-2 pb-0">
          {data.phone}
        </Label>
        <Input
          placeholder="0123 45 67 89"
          name="phone"
          type="text"
          className="mx-2 mt-0"
        />
      </FormGroup>
      <FormGroup className={`text-left`}>
        <Label for="message" className="mb-0 ml-2 pb-0">
          {data.message}
        </Label>
        <Input
          placeholder={data["message_placeholder"]}
          name="message"
          rows="3"
          type="textarea"
          className="mx-2 mt-0"
        />
      </FormGroup>
      <Row>
        <Col className="ml-auto mr-auto" md="6">
          <Button outline block type="submit" className="m-2" color="secondary">
            {status === "loading" ? <Loader small={true} /> : data.send}
          </Button>
          <div
            style={{
              textIndent: "-99999px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              position: "absolute",
            }}
            aria-hidden="true"
          >
            <input
              type="text"
              name="_gotcha"
              tabIndex="-1"
              autoComplete="off"
            />
          </div>
        </Col>
      </Row>
    </form>
  );
};

export default Form;
