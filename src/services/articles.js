import axios from "axios";

const url = "https://ahmed-markdown-blog.herokuapp.com";

const getArticles = async () => {
  try {
    const res = axios.get(`${url}/api/articles`);
    const { data: articles } = await res;
    return articles;
  } catch (error) {
    return error.message;
  }
};

const getArticle = async (articleSlug) => {
  try {
    const res = axios.get(`${url}/api/articles/${articleSlug}`);
    const { data: article } = await res;
    return article;
  } catch (error) {
    return error.message;
  }
};

const createArticle = async (article) => {
  try {
    const { title, markdown } = article;
    axios.post(`${url}/api/articles/new`, { title, markdown });
    return "Aticle Created Successfult";
  } catch (error) {
    return error.message;
  }
};

const updateArticle = async (articleSlug, newArticleData) => {
  const { title, markdown } = newArticleData;
  try {
    axios.patch(`${url}/api/articles/edit/${articleSlug}`, {
      title,
      markdown,
    });
  } catch (error) {
    return error.message;
  }
};

const deleteAricle = async (articleSlug) => {
  try {
    axios.delete(`${url}/api/articles/delete/${articleSlug}`);
    return "Aticle Deletd Successfult";
  } catch (error) {
    return error.message;
  }
};

export { getArticles, getArticle, createArticle, updateArticle, deleteAricle };
