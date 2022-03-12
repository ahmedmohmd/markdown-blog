import React, { useState } from "react";
import { createArticle } from "../services/articles";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import Header from "./common/Header";

const CreateArticleStyle = styled.div`
  div.heading {
    padding-bottom: 25px;

    h1 {
      text-transform: uppercase;
      font-weight: 500;
      letter-spacing: 0;
      line-height: 1.5em;
      padding-bottom: 15px;
      padding-top: 50px;
      position: relative;
      color: #333333;
      text-align: center;

      :before {
        content: "";
        position: absolute;
        bottom: 0;
        height: 5px;
        width: 55px;
        background-color: #c6c6c6;
        tranform: translateX(-50%);
      }

      :after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 2px;
        height: 1px;
        width: 95%;
        max-width: 255px;
        background-color: #c6c6c6;
        transform: translateX(-50%);
      }
    }
  }

  .form {
    background: #eaf0f2;
    padding: 40px;
    margin-bottom: 40px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 250px;
    width: 750px;
    max-width: 900px;
    border-radius: 15px;
    border: 7px solid #d3d7d9;

    @media (max-width: 425px) {
      width: 375px;
      padding: 25px;
    }

    @media (max-width: 375px) {
      width: 350px;
      padding: 20px;
    }

    @media (max-width: 325px) {
      width: 300px;
      padding: 15px;
    }

    #articleTitle {
      height: 55px;
    }

    input {
      outline: none;
      border: none;
      font-weight: bold;
      font-size: 1.2em;
      box-shadow: none;
      border: 3px solid transparent;

      :focus {
        border: 3px solid #0099ffba;
      }

      ::placeholder {
        font-weight: normal;
        color: #777;
      }
    }

    textarea {
      outline: none;
      border: none;
      resize: none;
      font-size: 1.1em;
      box-shadow: none;
      border: 3px solid transparent;

      :focus {
        border: 3px solid #0099ffba;
      }
      ::placeholder {
        font-weight: normal;
        color: #777;
      }
    }

    .btn {
      border: 3px solid #ff89b1;
      border-radius: 8px;
      background: #e91e63;
      box-shadow: none !important;
    }
  }
`;

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
    <CreateArticleStyle>
      <Header />
      <Container>
        <div className="heading">
          <h1>Create Article</h1>
          <span className="line-one"></span>
          <span className="line-two"></span>
        </div>

        <Row>
          <Col>
            <Form onSubmit={submitHandler} className="form">
              <Form.Group className="mb-3" controlId="articleTitle">
                <Form.Label className="badge bg-primary">
                  Email address
                </Form.Label>
                <Form.Control
                  type="text"
                  id="articleTitle"
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
                  id="articleMarkdown"
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

              <Button variant="primary" type="submit" className="btn">
                Create
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </CreateArticleStyle>
  );

  async function submitHandler(event) {
    event.preventDefault();

    if (formData.title && formData.markdown) {
      createArticle(formData);
      onCreate();
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
