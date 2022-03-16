import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { getArticle, deleteAricle } from "../services/articles";
import swal from "sweetalert";
import Header from "./common/Header";
import styles from "../styles/fullArticle.module.scss";

function FullArticle() {
  const [article, setArticle] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const article = await getArticle(params.slug);
      setArticle(article);
    };
    console.log(article);
    getData();
  }, []);

  return (
    <div className={styles.fullArticle}>
      <Header />
      <Container>
        <Row>
          <Col sm={12}>
            <div
              className={styles.header}
              style={{
                backgroundImage: `url(${
                  article.cover || "./images/cover.jpg"
                })`,
              }}
            >
              <div className={styles.headerContent}>
                <h1>{article.title}</h1>
                <span className={styles.date + " badge bg-primary"}>
                  Created at {new Date(article.createdAt).toLocaleDateString()}
                </span>
                <div className={styles.btns}>
                  <button
                    className={styles.deleteBtn}
                    onClick={deleteArticleHandler}
                  >
                    Delete
                  </button>
                  <button
                    className={styles.editBtn}
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
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: article.sanitizedHtml }}
            ></div>
          </Col>
        </Row>
      </Container>
    </div>
  );

  function deleteArticleHandler() {
    swal({
      title: "Are you sure?",
      text: "Once deleted, You will not be able to recover this Article file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteAricle(article.slug);
        swal("Article is Deleted Successfuly!", {
          icon: "success",
        }).then(() => (window.location = "/articles"));
      } else {
        return;
      }
    });
  }
}

export default FullArticle;
