import React, { useState } from "react";
import Joi from "joi";
import { createArticle } from "../services/articleService";
import { Col, Row, Form, Button } from "react-bootstrap";
import styles from "../styles/createArticle.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formValidate } from "../helpers/common";
import { toastOptions } from "../helpers/tokens";

function CreateArticle() {
  const schema = Joi.object({
    title: Joi.string().required().label("Title"),
    markdown: Joi.string().required().label("Markdown"),
    cover: Joi.string().uri().optional().allow(""),
  });

  const [formData, setFormData] = useState({
    title: "",
    markdown: "",
  });

  const [errors, setErrors] = useState({});

  return (
    <div className={styles.createArticle}>
      {/* <Header /> */}
      <div className="container">
        {/* <div className={styles.header}>
          <h1>Create Article</h1>
        </div> */}
        <Row>
          <Col>
            <Form onSubmit={submitHandler} className={styles.form}>
              <Form.Group className="mb-3" controlId="articleTitle">
                <Form.Label className="badge bg-primary">
                  Article Title
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title..."
                  onChange={(event) =>
                    setFormData({ ...formData, title: event.target.value })
                  }
                />
                {errors.title && (
                  <div className="alert alert-danger mt-1">{errors.title}</div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="articleImage">
                <Form.Label className="badge bg-primary">
                  Article Image
                </Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Enter Image Url..."
                  onChange={(event) =>
                    setFormData({ ...formData, cover: event.target.value })
                  }
                />
                {errors.cover && (
                  <div className="alert alert-danger mt-1">{errors.cover}</div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="articleMarkdown">
                <Form.Label className="badge bg-primary">
                  Article Content
                </Form.Label>
                <textarea
                  className="form-control"
                  rows="8"
                  onChange={(event) =>
                    setFormData({ ...formData, markdown: event.target.value })
                  }
                  placeholder="Enter Markdown..."
                ></textarea>
                {errors.markdown && (
                  <div className="alert alert-danger mt-1">
                    {errors.markdown}
                  </div>
                )}
              </Form.Group>

              <Button variant="primary" type="submit" className={styles.btn}>
                Create
              </Button>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </div>
      {/* <Footer /> */}
    </div>
  );

  async function submitHandler(event) {
    event.preventDefault();

    const validateResult = formValidate(formData, schema);
    if (validateResult) return setErrors(validateResult);

    try {
      await createArticle(formData);

      toast.success("Article Created Succefully", toastOptions);
      setTimeout(() => (window.location = "/"), 3000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // toast.error(error.response.data, toastOptions);
        setErrors({ ...errors, title: error.response.data });
      }
    }
  }
}

export default CreateArticle;
