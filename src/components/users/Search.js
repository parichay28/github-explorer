import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ showClear, clearUsers, searchUsers, setAlert }) => {
  const [searchUser, setsearchUser] = useState("");

  const getUser = event => {
    setsearchUser(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    if (searchUser === "") {
      setAlert("Search cannot be empty", "light");
    } else {
      searchUsers(searchUser);
      setsearchUser('');
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
      {showClear && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
};
 
export default Search;
