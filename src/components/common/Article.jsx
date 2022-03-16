import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/article.module.scss";

function Article({ article }) {
  const navigate = useNavigate();
  console.log(article.cover);
  return (
    <Card className={styles.article} style={{ width: "18rem" }}>
      <Card.Img variant="top" src={article.cover || "./images/preview.jpg"} />
      <Card.Body>
        <Card.Title>
          <h3>
            <Link to={`/${article.slug}`} className={styles.link}>
              {article.title}
            </Link>
          </h3>
        </Card.Title>

        <div className={styles.date}>
          {new Date(article.createdAt).toLocaleDateString()}
        </div>

        <Card.Text
          dangerouslySetInnerHTML={{
            __html:
              article.sanitizedHtml
                .substr(0, 40)
                .replace(/<[^>]*(>|$)| |‌|»|«|>/g, " ") + ".....",
          }}
        ></Card.Text>

        <button
          onClick={() => navigate(`/${article.slug}`)}
          className={styles.btn}
        >
          Read
        </button>
      </Card.Body>
    </Card>
  );
}

export default Article;
