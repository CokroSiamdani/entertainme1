import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AllTvSeries from "./pages/AllTvSeries";
import AllMovies from "./pages/AllMovies";
import CreateMovie from "./pages/CreateMovie";
import DetailMovie from "./pages/DetailMovie";
import EditMovie from "./pages/EditMovie";
import Favorites from "./pages/Favorites";
import { ApolloProvider } from "@apollo/client";
import client from "./config/graphql";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <div className="container-fluid bg-dark">
            <nav className="container navbar navbar-expand-lg navbar-dark bg-dark">
              <button
                className="navbar-toggler navbar-toggler-right"
                type="button"
                data-toggle="collapse"
                data-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="title" style={{color: "wheat"}}>
                <h4>Welcome To EntertainMe</h4>
              </div>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto mt-2 mt-md-0">
                  <li className="nav-item">
                    <Link style={{ border: "0" }} className="nav-link" to={"/"}>
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      style={{ border: "0" }}
                      className="nav-link"
                      to={"/tvseries"}
                    >
                      All TvSeries
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      style={{ border: "0" }}
                      className="nav-link"
                      to={"/movies"}
                    >
                      All Movies
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      style={{ border: "0" }}
                      className="nav-link"
                      to={"/create-movie"}
                    >
                      Create Movie
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      style={{ border: "0" }}
                      className="nav-link"
                      to={"/favorites"}
                    >
                      Favorites
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/tvseries">
              <AllTvSeries />
            </Route>
            <Route exact path="/movies">
              <AllMovies />
            </Route>
            <Route path="/create-movie">
              <CreateMovie />
            </Route>
            <Route path="/detail-movie/:id">
              <DetailMovie />
            </Route>
            <Route path="/edit-movie/:id">
              <EditMovie />
            </Route>
            <Route path="/favorites">
              <Favorites />
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
