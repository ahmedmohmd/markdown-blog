import { useState } from "react";
import Articles from "./components/UserArticles";
import { Routes, Route } from "react-router-dom";
import UpdateArticle from "./components/UpdateArticle";
import FullArticle from "./components/UserFullArticle";
import Home from "./components/Home";
import PublicArticles from "./components/PublicArticles";
import PublicFullArticle from "./components/PublicFullArticle";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import jwtDecode from "jwt-decode";
import { useLocation } from "react-router-dom";
import UserDashboard from "./components/UserDashboard";
import { useEffect } from "react";

function App() {
  const { pathname } = useLocation();
  const [user, setUser] = useState({});
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser(jwtDecode(localStorage.getItem("token")));
    }
  }, [localStorage.getItem("token")]);

  return (
    <div className="App">
      <Header user={user} />
      <main>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />

          <Route path="/allArticles/:slug" element={<PublicFullArticle />} />
          <Route path="/allArticles" element={<PublicArticles />} />

          <Route
            path="/dashboard/*"
            element={
              <AuthValidate>
                <UserDashboard user={user} />
              </AuthValidate>
            }
          />

          <Route
            path="/edit/:slug"
            element={
              <AuthValidate>
                <UpdateArticle />
              </AuthValidate>
            }
          />

          <Route
            path="/myArticles/:slug"
            element={
              <AuthValidate>
                <FullArticle />
              </AuthValidate>
            }
          />

          <Route
            path="/myArticles"
            element={
              <AuthValidate>
                <Articles />
              </AuthValidate>
            }
          />
        </Routes>
      </main>
      {!(pathname === "/") ? <Footer /> : null}
    </div>
  );

  function AuthValidate({ children }) {
    if (!user) {
      return (window.location = "/login");
    }

    return children;
  }
}

export default App;
