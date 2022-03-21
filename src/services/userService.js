import http from "./httpService";
import config from "../config/config.json";

// Get User
const getUser = () => {
  return http.get(`${config.apiEndPoint}/api/users/me`);
};

// Create User
const signUp = (user) => {
  return http.post(`${config.apiEndPoint}/api/users/register`, {
    name: user.name,
    email: user.email,
    password: user.password,
  });
};

// Update User
const updateUser = (user) => {
  return http.patch(`${config.apiEndPoint}/api/users/me`, {
    name: user.name,
    email: user.email,
    password: user.password,
  });
};

// SignIn User
const logIn = (user) => {
  return http.post(`${config.apiEndPoint}/api/users/login`, {
    email: user.email,
    password: user.password,
  });
};

// Log out
const logOut = () => {
  return http.post(`${config.apiEndPoint}/api/users/logout`);
};

// Logotu All
const logoutAll = () => {
  return http.post(`${config.apiEndPoint}/api/users/logoutAll`);
};

// Delete User
const deleteUser = () => {
  return http.delete(`${config.apiEndPoint}/api/users/me`);
};

export { getUser, signUp, updateUser, logIn, logOut, logoutAll, deleteUser };
