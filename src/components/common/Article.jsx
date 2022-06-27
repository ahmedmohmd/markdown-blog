//* Imports
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import styles from "../../styles/article.module.scss";

//* Artcle JSX
function Article({ article }) {
  const navigate = useNavigate();
  return (
    <div className={"card rounded" + styles.article} style={{ width: "18rem" }}>
      <img
        src={article.cover || "/images/preview.jpg"}
        style={{
          width: "100%",
          height: "225px",
          objectFit: "cover",
        }}
        className="card-img-top"
        alt="Article Image"
      />
      <div className="card-body">
        <div className="card-title">
          <h4>
            <Link to={`/myArticles/${article.slug}`} className={styles.link}>
              {article.title}
            </Link>
          </h4>
        </div>
        <div className="article-info w-100 d-flex justify-content-between align-items-center">
          <div className={styles.date}>
            <AiFillEye style={{ fontSize: 20 }} /> {article.clicks}
          </div>
          <div className={styles.date}>
            {new Date(article.createdAt).toLocaleDateString()}
          </div>
        </div>

        <p
          className="card-text"
          dangerouslySetInnerHTML={{
            __html:
              article.sanitizedHtml
                .substr(0, 40)
                .replace(/<[^>]*(>|$)| |‌|»|«|>/g, "") + ".....",
          }}
        ></p>
        <button
          onClick={() => navigate(`/myArticles/${article.slug}`)}
          className={styles.btn}
        >
          Read
        </button>
      </div>
    </div>
  );
}

export default Article;
