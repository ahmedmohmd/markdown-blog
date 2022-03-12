import React, { useState } from "react";
import { getArticle, updateArticle } from "../services/articles";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import Header from "./common/Header";

const UpdateArticleStyle = styled.div`
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
        left: 48%;
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
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 250px;
    width: 750px;
    max-width: 900px;
    border-radius: 15px;
    border: 7px solid #d3d7d9;
    margin-bottom: 40px;

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
    }

    .btn {
      border: 4px solid #59ffce;
      border-radius: 8px;
      background: #20c997;
      box-shadow: none !important;
    }
  }
`;

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
  useEffect(() => {
    const getData = async () => {
      const article = await getArticle(params.slug);
      setFormData(article);
    };

    getData();
  }, []);

  return (
    <UpdateArticleStyle>
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
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  id="articleTitle"
                  placeholder="Enter Title..."
                  onChange={(event) =>
                    setFormData({ ...formData, title: event.target.value })
                  }
                  value={formData.title}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="articleMarkdown">
                <Form.Label>Markdown</Form.Label>
                <textarea
                  className="form-control"
                  id="articleMarkdown"
                  rows="8"
                  onChange={(event) =>
                    setFormData({ ...formData, markdown: event.target.value })
                  }
                  value={formData.markdown}
                  placeholder="Enter Markdown..."
                ></textarea>
              </Form.Group>

              <Button variant="primary" type="submit" className="btn">
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </UpdateArticleStyle>
  );

  function submitHandler(e) {
    e.preventDefault();
    updateArticle(params.slug, formData);
    navigate("/articles");
    onUpdate(params.slug, formData);
  }
}

export default UpdateArticle;
