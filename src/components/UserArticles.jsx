import React from "react";
import { ToastContainer } from "react-toastify";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Article from "./common/Article";
import Header from "./common/Header";
import Footer from "./common/Footer";
import styles from "../styles/UserArticles.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import { getArticles } from "../services/articleService";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [nextPage, setNextPage] = useState(true);
  const [prevPage, setPrevPage] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getPublicArticles = async () => {
      try {
        const { data } = await getArticles(page);
        setArticles(data.result);
        setNextPage(data?.next?.page);
        setPrevPage(data?.prev?.page);
      } catch (error) {
        return;
      }
    };

    getPublicArticles();
  }, [page]);

  return (
    <div className={styles.articles}>
      <div className="container">
        <div className="row gap-3 flex-column">
          <div className="col sm-12 d-flex justify-content-center align-items-center">
            <div className={styles.heading}>
              <h1>Articles</h1>
            </div>
          </div>
          <div className="col sm-12 d-flex justify-content-center align-items-center">
            <div
              className={
                styles.content +
                " d-flex justify-content-start flex-wrap align-items-center"
              }
            >
              {(articles || []).map((article) => (
                <Article key={article._id} article={article} />
              ))}
            </div>
          </div>
          <div className={styles.btnsContainer + " col sm-12"}>
            <div className={styles.btns}>
              <button
                className={
                  "prev btn btn-" +
                  (prevPage ? "primary" : "secondary ") +
                  (!prevPage ? "disabled" : "")
                }
                onClick={prevPageHandler}
              >
                <FaArrowLeft />
              </button>
              <button
                className={
                  "next btn btn-" +
                  (nextPage ? "primary" : "secondary ") +
                  (!nextPage ? "disabled" : "")
                }
                onClick={nextPageHandler}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );

  function nextPageHandler() {
    if (nextPage) {
      setPage(page + 1);
    }
    window.scroll({
      top: 0,
      behaviour: "smooth",
    });
  }

  function prevPageHandler() {
    if (prevPage) {
      setPage(page - 1);
    }
    window.scroll({
      top: 0,
      behaviour: "smooth",
    });
  }
}

export default Articles;
