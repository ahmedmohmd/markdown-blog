import React, { useState } from "react";
import swal from "sweetalert";
import { createArticle } from "../services/articles";
import { useNavigate } from "react-router-dom";
import { Col, Row, Form, Button } from "react-bootstrap";
import Header from "./common/Header";
import styles from "../styles/createArticle.module.scss";
import Footer from "./common/Footer";

function CreateArticle() {
  const [formData, setFormData] = useState({
    title: "",
    markdown: "",
    cover: "",
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
                  Article Title
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
      <Footer />
    </div>
  );

  function submitHandler(event) {
    event.preventDefault();

    if (formData.title && formData.markdown) {
      createArticle(formData).then((article) => {
        if (!article.title) {
          setErrors({ title: article });
        } else {
          setErrors({ title: "" });
          swal({
            title: "Article is Created Successfuly!",
            icon: "success",
          }).then(() => (window.location = "/articles"));
        }
      });
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
