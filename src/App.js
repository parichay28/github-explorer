import React  from "react";
import "./App.css";

import Navbar from "./components/layout/Navbar";

import User from "./components/users/User";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";

import { Route, Switch, BrowserRouter } from "react-router-dom";

import Home from "./components/pages/Home";

import Alert from "./components/layout/Alert";

import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <BrowserRouter>
          <div className="App">
            <Navbar />

            <div className="container">
              <Alert />
              <Switch>
                <Route exact path="/" component={Home} />

                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </AlertState>
    </GithubState>
  );
};

export default App;
