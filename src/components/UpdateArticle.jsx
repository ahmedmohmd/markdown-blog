import Joi from "joi";
import React, { useState } from "react";
import { getArticle, updateArticle } from "../services/articleService";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { formValidate } from "../helpers/common";
import { toastOptions } from "../helpers/tokens";
import Footer from "./common/Footer";
import Header from "./common/Header";
import styles from "../styles/updateArticle.module.scss";

const schema = Joi.object({
  title: Joi.string().required().label("Title"),
  markdown: Joi.string().required().label("Markdown"),
  cover: Joi.string().uri().optional().allow(""),
});

function UpdateArticle() {
  const params = useParams();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const { data: article } = await getArticle(params.slug);
        setFormData({
          title: article.title,
          cover: article.cover,
          markdown: article.markdown,
        });
      } catch (error) {
        if (
          (error.response && error.response.status === 404) ||
          error.response.status === 400
        ) {
          toast.error(error.response.data, toastOptions);
        }
      }
    };

    getData();
  }, []);

  return (
    <div className={styles.updateArticle}>
      <div className="container">
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
                {errors.title && (
                  <div className="alert alert-danger mt-1">{errors.title}</div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="articleCover">
                <Form.Label className="badge bg-primary">
                  Article Image
                </Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Enter Image Url..."
                  onChange={(event) =>
                    setFormData({ ...formData, cover: event.target.value })
                  }
                  value={formData.cover}
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
                  value={formData.markdown}
                ></textarea>
                {errors.markdown && (
                  <div className="alert alert-danger mt-1">
                    {errors.markdown}
                  </div>
                )}
              </Form.Group>

              <Button variant="primary" type="submit" className={styles.btn}>
                Update
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

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      await updateArticle(params.slug, formData);

      toast.success("Article Updated Succefully", toastOptions);
      setTimeout(() => (window.location = "/"), 3000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data, toastOptions);
      }
    }
  }
}

export default UpdateArticle;
