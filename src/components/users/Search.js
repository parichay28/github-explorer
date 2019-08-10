import React, { useState, useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import GithubContext from "../../context/github/githubContext";

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [searchUser, setsearchUser] = useState("");

  const getUser = event => {
    setsearchUser(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    if (searchUser === "") {
      alertContext.setAlert("Search cannot be empty", "light");
    } else {
      githubContext.searchUsers(searchUser);
      setsearchUser("");
    }
  };
  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="searchUser"
          value={searchUser}
          placeholder="Search Users"
          onChange={getUser}
        />

        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className="btn btn-light btn-block"
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
