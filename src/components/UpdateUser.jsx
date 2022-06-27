//* Imports
import React, { useState } from "react";
import Joi from "joi";
import { Col, Row, Form, Button } from "react-bootstrap";
import styles from "../styles/UpdateUser.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formValidate } from "../helpers/common";
import { toastOptions } from "../helpers/tokens";
import { updateUser } from "../services/userService";

//* UpdateUser JSX
function UpdateUser({ user }) {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().min(6).optional().allow("").label("Password"),
  });

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: "",
  });

  const [errors, setErrors] = useState({});

  return (
    <div className={styles.updateUser}>
      <div className="container">
        <Row>
          <Col>
            <Form onSubmit={submitHandler} className={styles.form}>
              <Form.Group className="mb-3" controlId="userName">
                <Form.Label className="badge bg-primary">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Name..."
                  onChange={(event) =>
                    setFormData({ ...formData, name: event.target.value })
                  }
                  value={formData.name}
                />
                {errors.name && (
                  <div className="alert alert-danger mt-1">{errors.name}</div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="userEmail">
                <Form.Label className="badge bg-primary">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Your Email..."
                  onChange={(event) =>
                    setFormData({ ...formData, email: event.target.value })
                  }
                  value={formData.email}
                />
                {errors.email && (
                  <div className="alert alert-danger mt-1">{errors.email}</div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="userPassword">
                <Form.Label className="badge bg-primary">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Your Password to Confirm..."
                  onChange={(event) =>
                    setFormData({ ...formData, password: event.target.value })
                  }
                />
                {errors.password && (
                  <div className="alert alert-danger mt-1">
                    {errors.password}
                  </div>
                )}
              </Form.Group>

              <Button variant="primary" type="submit" className={styles.btn}>
                Register
              </Button>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </div>
    </div>
  );

  async function submitHandler(event) {
    event.preventDefault();

    const validateResult = formValidate(formData, schema);
    if (validateResult) return setErrors(validateResult);

    try {
      const { data } = await updateUser(formData);
      localStorage.setItem("token", data.token);

      toast.success("Your Info is Updated Successfully :)", toastOptions);
      setTimeout(() => (window.location = "/"), 3000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data, toastOptions);
      }
    }
  }
}

export default UpdateUser;
