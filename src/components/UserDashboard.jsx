//* Imports
import React from "react";
import styles from "../styles/UserDashboard.module.scss";
import { Routes, Route, NavLink } from "react-router-dom";
import UpdateUser from "./UpdateUser";
import CreateArticle from "./CreateArticle";
import { deleteUser } from "../services/userService";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../helpers/tokens";
import swal from "sweetalert";

//* UserDashboard JSX
function UserDashboard({ user }) {
  return (
    <div className={styles.dashboard}>
      <div className="container">
        <div className="row gap-3">
          <div className={"col-sm-12 col-md-3 " + styles.navParent}>
            <div
              className={"list-group " + styles.navigator}
              id="list-tab"
              role="tablist"
            >
              <NavLink
                to="/dashboard/userData"
                className="list-group-item list-group-item-action"
              >
                Your Info
              </NavLink>
              <NavLink
                to="/dashboard/editUserData"
                className="list-group-item list-group-item-action "
              >
                Edit Your Data
              </NavLink>
              <NavLink
                to="/dashboard/createArticle"
                className="list-group-item list-group-item-action "
              >
                Create Article
              </NavLink>
              <NavLink
                to="/myArticles"
                className="list-group-item list-group-item-action "
              >
                My Articles
              </NavLink>
              <NavLink
                to="/dashboard/deleteAccount"
                className={"list-group-item list-group-item-action deleteBtn"}
              >
                Delete Your Account
              </NavLink>
            </div>
          </div>
          <Routes>
            <Route
              path="userData"
              element={
                <div className=" col-md-8">
                  <div className={styles.content}>
                    <div className={styles.userImage}>
                      <img src="/images/user.png" alt="User Icon" />
                    </div>
                    <div className={styles.info}>
                      <div className="name d-flex justify-content-center align-items-center gap-3">
                        <h3>Name:</h3>
                        <h3> {user.name}</h3>
                      </div>
                      <div className="email d-flex justify-content-center align-items-center gap-3">
                        <h3>Email:</h3>
                        <h3> {user.email}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            <Route
              path="editUserData"
              element={
                <div className="col-sm-12 col-md-8">
                  <UpdateUser user={user} />
                </div>
              }
            />
            <Route
              path="createArticle"
              element={
                <div className="col-sm-12 col-md-8">
                  <CreateArticle />
                </div>
              }
            />
            <Route
              path="deleteAccount"
              element={
                <div className="col-sm-12 col-md-8">
                  <div className="alert alert-danger">
                    Be Cearful, If you deleted yoru account all your articles
                    will deleted!
                  </div>
                  <div
                    className="btn btn-danger"
                    onClick={async () => {
                      swal({
                        title: "Are you sure?",
                        text: "Be Cearful, If you deleted yoru account all your articleswill deleted!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      }).then((willDelete) => {
                        if (willDelete) {
                          localStorage.removeItem("token");
                          deleteUser()
                            .then(() => {
                              swal({
                                title: "Your Account Deleted Successfuly",
                                text: "",
                                icon: "success",
                                button: "Ok",
                              }).then(() => (window.location = "/login"));
                            })
                            .catch((error) => {
                              if (
                                error.response &&
                                error.response.status === 500
                              ) {
                                toast("There is an Error!", toastOptions);
                              }
                            });
                        }
                      });

                      // try {
                      //   localStorage.removeItem("token");
                      //   await deleteUser();
                      //   swal({
                      //     title: "Your Account Deleted Successfuly",
                      //     text: "",
                      //     icon: "success",
                      //     button: "Ok",
                      //   }).then(() => (window.location = "/login"));
                      // } catch (error) {
                      //   if (error.response && error.response.status === 500) {
                      //     toast("There is an Error!", toastOptions);
                      //   }
                      // }
                    }}
                  >
                    Delete My Account
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UserDashboard;
