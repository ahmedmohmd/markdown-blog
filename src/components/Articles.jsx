import React from "react";
import styled from "styled-components";
import Article from "./common/Article";
import Header from "./common/Header";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

const ArticlesStyle = styled.div`
  padding-bottom: 25px;

  .content {
    border-radius: 5px;
    align-items: stretch !important;

    background: #eaf0f2;
    padding: 1em;
    gap: 10px;
    display: inline-flex !important;

    @media (max-width: 767px) {
      justify-content: center !important;
    }
  }

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

      :before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        height: 5px;
        width: 55px;
        background-color: #c6c6c6;
      }

      :after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 2px;
        height: 1px;
        width: 95%;
        max-width: 255px;
        background-color: #c6c6c6;
      }
    }
  }
`;

function Articles({ articles, onDelete }) {
  return (
    <ArticlesStyle>
      <Header />
      <Container>
        <Row>
          <Col sm={12}>
            <div className="heading">
              <h1>Articles</h1>
              <span className="line-one"></span>
              <span className="line-two"></span>
            </div>
          </Col>
          <Col sm={12}>
            <div className="content d-flex justify-content-start flex-wrap align-items-center">
              {articles.map((article) => (
                <Article article={article} onDelete={onDelete} />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </ArticlesStyle>
  );
}

export default Articles;
