import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getArticle, deleteAricle } from "../services/articles";
import Header from "./common/Header";

const FullArticleStyle = styled.div`
  .header {
    height: 300px;
    background-image: url(./images/cover.jpg);
    margin-bottom: 15px;
    background-size: cover;
    position: relative;
    border-radius: 15px;
    overflow: hidden;
    margin: 10px;

    .header-content {
      position: absolute;
      width: 100%;
      z-index: 1;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 15px;
    }

    .btns {
      display: flex;
      gap: 10px;

      button {
        border-radius: 8px;
        box-shadow: none !important;
        padding: 5px 10px;
        color: #fff;
        font-size: 1.1rem;
      }

      button.delete-btn {
        border: 4px solid #ff89b1;
        background: #e91e63;
      }

      button.edit-btn {
        border: 4px solid #59ffce;
        background: #20c997;
      }
    }

    &::after {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      background: #222222d9;
    }

    img {
      max-width: 100%;
    }

    h1 {
      width: 100%;
      text-align: center;
      padding: 0 10px;
      margin: 0;
      color: #fff;
      z-index: 1;
      font-size: 3rem;
      font-family: "Black Ops One";

      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }
  }

  .date {
    font-size: 1rem;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }

    @media (max-width: 425px) {
      font-size: 0.7rem;
    }
  }

  .content {
    background: #f9f9f9;
    margin-top: 15px;
    padding: 15px;
    border-radius: 10px;
    border: 7px solid #efefef;
    margin-top: 50px;
    word-wrap: break-word;
    margin-bottom: 25px;
  }
`;

function FullArticle({ onDelete }) {
  const [article, setArticle] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const article = await getArticle(params.slug);
      setArticle(article);
    };

    getData();
  }, []);

  return (
    <FullArticleStyle>
      <Header />
      <Container>
        <Row>
          <Col sm={12}>
            <div className="header">
              <div className="header-content">
                <h1>{article.title}</h1>
                <span className="date badge bg-primary">
                  Created at {new Date(article.createdAt).toLocaleDateString()}
                </span>
                <div className="btns">
                  <button className="delete-btn" onClick={deleteArticleHandler}>
                    Delete
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/edit/${article.slug}`)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </Col>
          <Col sm={12}>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: article.sanitizedHtml }}
            ></div>
          </Col>
        </Row>
      </Container>
    </FullArticleStyle>
  );

  function deleteArticleHandler() {
    onDelete();
    deleteAricle(article.slug);
    navigate("/articles");
  }
}

export default FullArticle;
