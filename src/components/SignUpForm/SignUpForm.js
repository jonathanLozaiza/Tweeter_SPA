import React, { useState } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validations";
import { signUpApi } from "../../services/api/auth";
import "./SignUpForm.scss";

export default function SignUpForm(props) {
  const { setShowModal } = props;

  const [formData, setFormData] = useState(initialState());
  const [signUpLoading, setSignUpLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });
    if (validCount !== size(formData)) {
      toast.warning("Completa todos los campos del formulario.");
    } else if (!isEmailValid(formData.email)) {
      toast.warning("Email Invalido.");
    } else if (formData.password !== formData.repeatPassword) {
      toast.warning("No coincide el password.");
    } else if (formData.password.length < 6) {
      toast.warning("La password tiene que tener al menos 6 caracteres.");
    } else {
      setSignUpLoading(true);
      signUpApi(formData)
        .then((res) => {
          if (res.code) {
            toast.warning(res.message);
          } else {
            toast.success("El registro ha sido correcto.");
            setShowModal(false);
            setFormData(initialState());
          }
        })
        .catch(() => {
          toast.error("Error del servidor. Intentelo mas tarde.");
        })
        .finally(() => {
          setSignUpLoading(false);
        });
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="sign-up-form">
      <h2>Crea tu cuenta</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Name *"
                name="name"
                defaultValue={formData.name}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Last Name *"
                name="lastName"
                defaultValue={formData.lastName}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Email *"
            name="email"
            defaultValue={formData.email}
          />
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="password"
                placeholder="Password *"
                name="password"
                defaultValue={formData.password}
              />
            </Col>
            <Col>
              <Form.Control
                type="password"
                placeholder="Repeat Password *"
                name="repeatPassword"
                defaultValue={formData.repeatPassword}
              />
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          {!signUpLoading ? "Registrate" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
}

function initialState() {
  return {
    name: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
}
