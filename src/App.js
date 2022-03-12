import { useEffect, useState } from "react";
import Articles from "./components/Articles";
import CreateArticle from "./components/CreateArticle";
import { Routes, Route } from "react-router-dom";

import { getArticles } from "./services/articles";
import UpdateArticle from "./components/UpdateArticle";
import FullArticle from "./components/FullArticle";
import Home from "./components/Home";

function App() {
  const [articles, setArticles] = useState([]);
  const [nextPage, setNextPage] = useState(true);
  const [prevPage, setPrevPage] = useState(true);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data = await getArticles(page);
      setArticles(data.result);
      setNextPage(data?.next?.page);
      setPrevPage(data?.prev?.page);
    };

    getData();
  }, [page]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route
          path="/edit/:slug"
          element={<UpdateArticle onUpdate={updateHandler} />}
        />
        <Route
          path="/new"
          element={<CreateArticle onCreate={createHandler} />}
        />
        <Route
          path="/:slug"
          element={<FullArticle onDelete={deleteHandler} />}
        />
        <Route
          path="/articles"
          element={
            <Articles
              articles={articles}
              onNext={nextPageHandler}
              onPrev={prevPageHandler}
              next={nextPage}
              prev={prevPage}
            />
          }
        />
      </Routes>
    </div>
  );

  function updateHandler(slug, newArticle) {
    const index = articles.findIndex((article) => article.slug === slug);
    const newArticles = [...articles];
    newArticles[index] = newArticle;
    setArticles(newArticles);
  }

  function createHandler(article) {
    setArticles([...articles, article]);
  }

  function deleteHandler(slug) {
    const article = articles.find((article) => article.slug === slug);
    const newArticles = articles.filter((ar) => ar.slug !== article.slug);
    setArticles(newArticles);
  }

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

export default App;
