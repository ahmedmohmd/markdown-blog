import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ArticleStyle = styled.div`
  .link {
    text-decoration: none;
    color: #222222;

    :hover {
      color: #0d6efd;
    }
  }

  .article {
    border-radius: 0;
    border: none;

    @media (max-width: 320px) {
      width: 250px !important;
    }
  }

  .date {
    font-weight: bold;
    color: #777;
    padding-bottom: 15px;
  }

  .btn {
    border: 3px solid #ff89b1;
    border-radius: 8px;
    background: #e91e63;
    box-shadow: none !important;
  }
`;

function Article({ article, onDelete }) {
  const navigate = useNavigate();

  return (
    <ArticleStyle>
      <Card className="article" style={{ width: "18rem" }}>
        <Card.Img variant="top" src="./images/preview.jpg" />
        <Card.Body>
          <Card.Title>
            <h3>
              <Link to={`/${article.slug}`} className="link">
                {article.title}
              </Link>
            </h3>
          </Card.Title>

          <div className="date">
            <span className="date">
              {new Date(article.createdAt).toLocaleDateString()}
            </span>
          </div>

          <Card.Text
            dangerouslySetInnerHTML={{
              __html: article.sanitizedHtml
                .substr(0, 50)
                .replace(/<[^>]*(>|$)| |‌|»|«|>/g, " "),
            }}
          ></Card.Text>

          <Button
            variant="primary"
            onClick={() => navigate(`/${article.slug}`)}
            className="btn"
          >
            Read
          </Button>
        </Card.Body>
      </Card>
    </ArticleStyle>
  );
}

export default Article;
