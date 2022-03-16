import axios from "axios";

const url = "https://markdown-blog-backend.herokuapp.com";

const getArticles = async (page) => {
  try {
    const res = axios.get(`${url}/api/articles?limit=4&page=${page}`);
    const { data } = await res;
    return data;
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
    const { title, markdown, cover } = article;
    const res = await axios.post(`${url}/api/articles/new`, {
      title,
      markdown,
      cover,
    });
    const { data } = await res;
    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error: ", error);
    }
  }
};

const updateArticle = async (articleSlug, newArticleData) => {
  const { title, markdown, cover } = newArticleData;
  try {
    const res = await axios.patch(`${url}/api/articles/edit/${articleSlug}`, {
      title,
      markdown,
      cover,
    });

    const { data } = await res;
    return data;
  } catch (error) {
    return error.message;
  }
};

const deleteAricle = async (articleSlug) => {
  try {
    axios.delete(`${url}/api/articles/delete/${articleSlug}`);
    console.log("Aticle Deletd Successfult");
  } catch (error) {
    return error.message;
  }
};

export { getArticles, getArticle, createArticle, updateArticle, deleteAricle };
