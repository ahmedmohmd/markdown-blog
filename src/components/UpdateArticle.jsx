import React, { useState } from "react";
import { getArticle, updateArticle } from "../services/articles";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import Header from "./common/Header";
import styles from "../styles/updateArticle.module.scss";
import Footer from "./common/Footer";

function UpdateArticle({ onUpdate }) {
  const params = useParams();

  const [articleData, setArticleData] = useState({
    title: "",
    markdown: "",
  });

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: articleData.title,
    markdown: articleData.markdown,
  });
  const [errors, setErrors] = useState({
    title: "",
    markdown: "",
  });

  useEffect(() => {
    const getData = async () => {
      const article = await getArticle(params.slug);
      setFormData(article);
    };

    getData();
  }, []);

  return (
    <div className={styles.updateArticle}>
      <Header />
      <Container>
        <div className={styles.header}>
          <h1>Update Article</h1>
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
                  value={formData.title}
                />
                {errors.title ? (
                  <div className="alert alert-danger mt-1">{errors.title}</div>
                ) : null}
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
                  value={formData.markdown}
                  placeholder="Enter Markdown..."
                ></textarea>
                {errors.markdown ? (
                  <div className="alert alert-danger mt-1">
                    {errors.markdown}
                  </div>
                ) : null}
              </Form.Group>

              <Button variant="primary" type="submit" className={styles.btn}>
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );

  function submitHandler(event) {
    event.preventDefault();

    if (formData.title && formData.markdown) {
      updateArticle(params.slug, formData).then((newArticle) =>
        onUpdate(params.slug, newArticle)
      );

      navigate("/articles");
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

export default UpdateArticle;
