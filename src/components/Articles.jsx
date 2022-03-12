import React from "react";
import Article from "./common/Article";
import Header from "./common/Header";
import styles from "../styles/articles.module.scss";
import Footer from "./common/Footer";

function Articles({ articles, onDelete, onNext, onPrev, next, prev }) {
  return (
    <div className={styles.articles}>
      <Header />
      <main>
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
                {articles.map((article) => (
                  <Article article={article} onDelete={onDelete} />
                ))}
              </div>
            </div>
            <div className={styles.btnsContainer + " col sm-12"}>
              <div className={styles.btns}>
                <button
                  className={
                    "prev btn btn-primary " + (!prev ? "disabled" : "")
                  }
                  onClick={onPrev}
                >
                  Prev
                </button>
                <button
                  className={
                    "next btn btn-primary " + (!next ? "disabled" : "")
                  }
                  onClick={onNext}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Articles;
