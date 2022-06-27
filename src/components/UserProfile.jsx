//* Imports
import React from "react";
import { deleteUser } from "../services/userService";

//* UserProfile JSX
function UserProfile({ user }) {
  return (
    <div>
      <h1>User Profile</h1>
      <h2>{user?.name}</h2>
      <span>{user?.email}</span>
      <button
        onClick={async () => {
          localStorage.removeItem("token");
          await deleteUser();
          window.location = "/login";
        }}
        className="btn btn-danger"
      >
        Delete User
      </button>
    </div>
  );
}

export default UserProfile;
