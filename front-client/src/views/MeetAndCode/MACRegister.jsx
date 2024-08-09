import React from "react";
import { Form, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";

const MACRegister = ({ handleSubmit, formData, setFormData, data }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="mb-5" style={{ position: "sticky", top: "100px" }}>
      <h3>{data?.inscription}</h3>
      <Form onSubmit={(e) => handleSubmit(e, formData)}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="parentFirstName">{data?.firstParent}</Label>
              <Input
                type="text"
                name="parentFirstName"
                id="parentFirstName"
                value={formData.parentFirstName}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="parentLastName">{data?.lastParent}</Label>
              <Input
                type="text"
                name="parentLastName"
                id="parentLastName"
                value={formData.parentLastName}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="childFirstName">{data?.firstChild}</Label>
              <Input
                type="text"
                name="childFirstName"
                id="childFirstName"
                value={formData.childFirstName}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="childLastName">{data?.lastChild}</Label>
              <Input
                type="text"
                name="childLastName"
                id="childLastName"
                value={formData.childLastName}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={12}>
            <FormGroup>
              <Label for="childBirthday">{data?.birthday}</Label>
              <Input
                type="date"
                name="childBirthday"
                id="childBirthday"
                value={formData.childBirthday}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="parentEmail">{data?.email}</Label>
          <Input
            type="email"
            name="parentEmail"
            id="parentEmail"
            value={formData.parentEmail}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="parentPhone">{data?.phone}</Label>
          <Input
            type="text"
            name="parentPhone"
            id="parentPhone"
            value={formData.parentPhone}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="comments">{data?.comments}</Label>
          <Input type="textarea" name="comments" id="comments" value={formData.comments} onChange={handleChange} />
        </FormGroup>
        <FormGroup className="ml-4">
          <Label check>
            <Input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} required />{" "}
            {data?.accept}
          </Label>
        </FormGroup>
        <Button type="submit" color="secondary" className="w-100">
          {data?.register}
        </Button>
      </Form>
    </div>
  );
};

export default MACRegister;
