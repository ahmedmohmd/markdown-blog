import React, { useState } from "react";
import { createArticle } from "../services/articles";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import Header from "./common/Header";
import styles from "../styles/createArticle.module.scss";

function CreateArticle({ onCreate }) {
  const [formData, setFormData] = useState({
    title: "",
    markdown: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    markdown: "",
  });

  const navigate = useNavigate();

  return (
    <div className={styles.createArticle}>
      <Header />
      <div className="container">
        <div className={styles.header}>
          <h1>Create Article</h1>
        </div>

        <Row>
          <Col>
            <Form onSubmit={submitHandler} className={styles.form}>
              <Form.Group className="mb-3" controlId="articleTitle">
                <Form.Label className="badge bg-primary">
                  Email address
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title..."
                  onChange={(event) =>
                    setFormData({ ...formData, title: event.target.value })
                  }
                />
                {errors.title ? (
                  <div className="alert alert-danger mt-1">{errors.title}</div>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-3" controlId="articleMarkdown">
                <Form.Label className="badge bg-primary">Markdown</Form.Label>
                <textarea
                  className="form-control"
                  rows="8"
                  onChange={(event) =>
                    setFormData({ ...formData, markdown: event.target.value })
                  }
                  placeholder="Enter Markdown..."
                ></textarea>
                {errors.markdown ? (
                  <div className="alert alert-danger mt-1">
                    {errors.markdown}
                  </div>
                ) : null}
              </Form.Group>

              <Button variant="primary" type="submit" className={styles.btn}>
                Create
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );

  async function submitHandler(event) {
    event.preventDefault();

    if (formData.title && formData.markdown) {
      createArticle(formData).then((article) => {
        onCreate(article);
      });
      navigate(`/articles`);
    } else {
      if (!formData.title && !formData.markdown) {
        setErrors({
          markdown: "Markdown Field is Requires",
          title: "Title Field is Requires",
        });
      } else if (!formData.markdown) {
        setErrors({ title: "", markdown: "Markdown Field is Requires" });
      } else if (!formData.title) {
        return setErrors({ markdown: "", title: "Title Field is Requires" });
      } else {
        setErrors({ title: "", markdown: "" });
      }
    }
  }
}

export default CreateArticle;
