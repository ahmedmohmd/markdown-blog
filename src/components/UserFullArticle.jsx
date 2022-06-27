//* Imports
import { Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getArticle, deleteAricle } from "../services/articleService";
import swal from "sweetalert";
import styles from "../styles/UserFullArticle.module.scss";
import { AiFillEye } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../helpers/tokens";

//* FullArticle JSX
function FullArticle() {
  const params = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getArticle(params.slug);
        setArticle(data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error(error.response.data, toastOptions);
        }
      }
    };
    getData();
  }, []);

  return (
    <div className={styles.fullArticle}>
      {/* <Header /> */}
      <Container>
        <Row>
          <Col sm={12}>
            <div
              className={styles.header}
              style={{
                backgroundImage: `url(${article.cover || "/images/cover.jpg"})`,
              }}
            >
              <div className={styles.headerContent}>
                <h1>{article.title}</h1>
                <span className={styles.date + " badge bg-primary"}>
                  Created at {new Date(article.createdAt).toLocaleDateString()}
                </span>
                <span className="badge bg-info">
                  <AiFillEye /> <span>{article.clicks}</span>
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
        <ToastContainer />
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
        return deleteAricle(article.slug)
          .then(() => {
            toast.success("Article deleted Sucessfully", toastOptions);
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              toast.error(error.response.data, toastOptions);
            }
            setTimeout(() => (window.location = "/"), 3000);
          });
      }
    });
  }
}

export default FullArticle;
