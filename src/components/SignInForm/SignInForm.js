import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validations";
import { signInAPI } from "../../services/api/auth";
import { setTokenAPI } from "../../services/api/auth";
import "./SignInForm.scss";

export default function SignInForm(props) {
  const { setRefreshCheckLogin } = props;
  const [formData, setFormData] = useState(initialState());
  const [signInLoading, setSignInLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });
    if (size(formData) !== validCount) {
      toast.warning("Completa todos los cambios del formulario.");
    } else {
      if (!isEmailValid(formData.email)) {
        toast.error("Email invalido.");
      } else {
        setSignInLoading(true);
        signInAPI(formData)
          .then((response) => {
            if (response.code) {
              toast.warning(response.message);
            } else {
              setTokenAPI(response.token);
              setRefreshCheckLogin(true);
            }
          })
          .catch(() => {
            toast.error("Error en el servidor, Intentelo mas tarde.");
          })
          .finally(() => {
            setSignInLoading(false);
          });
      }
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="sign-in-form">
      <h2>Entrar</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email *"
            defaultValue={formData.email}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password *"
            defaultValue={formData.password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {signInLoading ? <Spinner animation="border" /> : "Sign In"}
        </Button>
      </Form>
    </div>
  );
}

function initialState() {
  return {
    email: "",
    password: "",
  };
}
