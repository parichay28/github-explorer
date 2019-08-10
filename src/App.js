import React, { Fragment, useState } from "react";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import About from "./components/pages/About";

import { Route, Switch, BrowserRouter } from "react-router-dom";

import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";

import axios from "axios";

const App = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);


  //fetches users from github api

const searchUsers = async searchUser => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/search/users?q=${searchUser}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    
    //this.setState({ loading: false, users: res.data.items });
    setUsers(res.data.items);
    setLoading(false);
  };


const  getUser = async username => {
    //this.setState({ loading: true });
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID
    }&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    //this.setState({ user: res.data, loading: false });
    setUser(res.data);
    setLoading(false);
  };


  // get user's repos
  const getUserRepos = async username => {
    //this.setState({ loading: true });
    setLoading(false);


    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID
    }&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    //this.setState({ repos: res.data, loading: false });
    setRepos(res.data);
    setLoading(false);

  };

  // clear users on screen
  clearUsers = () => {
    //this.setState({ loading: false, users: [] })};
    setUsers([]);
    setLoading(false);


  // sets an alert in case the empty search is querried
const  showAlert = (message, type) => {
    //this.setState({ alert: { message, type } });
    setAlert({msg, type});
    //setTimeout(() => this.setState({ alert: null }), 5000);
    setTimeout(() => setAlert(null), 5000);
  };

    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />

          <div className="container">
          <Alert alert={alert} /> 
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={showAlert}
                    />
                    <Users
                      loading={loading}
                      users={users}
                    />
                  </Fragment>
                )}
              />

              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={this.state.user}
                    repos={this.state.repos}
                    loading={this.state.loading}
                  />
                )}
              />
            </Switch>
            
          </div>
        </div>
      </BrowserRouter>
    );
  
}

export default App;
