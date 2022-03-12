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

  useEffect(() => {
    const getData = async () => {
      const articles = await getArticles();
      setArticles(articles);
    };

    getData();
  });

  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route
          path="edit/:slug"
          element={<UpdateArticle onUpdate={updateHnalder} />}
        />
        <Route path="/new" element={<CreateArticle />} />
        <Route path="/:slug" element={<FullArticle />} />
        <Route
          path="/articles"
          element={<Articles articles={articles} onDelete={deleteHandler} />}
        />
      </Routes>
    </div>
  );

  function updateHnalder(slug, newValue) {
    const index = articles.findIndex((article) => article.slug === slug);
    articles[index] = newValue;
  }

  function deleteHandler(slug) {
    const index = articles.findIndex((article) => article.slug === slug);
    articles.splice(index, 1);
  }
}

export default App;
