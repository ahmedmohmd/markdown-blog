//* Imports
import config from "../config/config.json";
import http from "../services/httpService";

const getAllArticles = async (page) => {
  return http.get(`${config.apiEndPoint}/api/articles?limit=4&page=${page}`);
};

const getArticles = async (page) => {
  return http.get(
    `${config.apiEndPoint}/api/articles/all?limit=4&page=${page}`
  );
};

const getArticle = async (articleSlug) => {
  return http.get(`${config.apiEndPoint}/api/articles/${articleSlug}`);
};

const getPublicArticle = async (articleSlug) => {
  return http.get(`${config.apiEndPoint}/api/articles/public/${articleSlug}`);
};

const createArticle = (article) => {
  return http.post(`${config.apiEndPoint}/api/articles/new`, {
    title: article.title,
    markdown: article.markdown,
    cover: article.cover,
  });
};

const updateArticle = (articleSlug, article) => {
  return http.patch(`${config.apiEndPoint}/api/articles/edit/${articleSlug}`, {
    title: article.title,
    markdown: article.markdown,
    cover: article.cover,
  });
};

const deleteAricle = async (articleSlug) => {
  return http.delete(
    `${config.apiEndPoint}/api/articles/delete/${articleSlug}`
  );
};

export {
  getAllArticles,
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteAricle,
  getPublicArticle,
};
