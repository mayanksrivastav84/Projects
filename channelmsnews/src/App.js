import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Clock from "./components/clock";
import Date from "./components/date";
import BreakingNews from "./components/home";
import Category from "./components/Category";
import MyAccount from "./components/MyAccount";
import Search from "./components/Search";
import Region from "./components/Region"
import SideMenu from "./components/sidemenu";
import newsApi from "./apis/newsApi";
import Weather from "./components/defaultWeather";

import "bulma/css/bulma.css";

export default class App extends Component {
  state = {
    news: [],
  };

  componentDidMount = () => {
    newsApi
      .get(
        "top-headlines?country=GB&pageSize=12&apiKey=8f47a48a41494480b72c7e5102db18ce"
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.setState({ news: response.data.articles });
        }
      })
      .catch((error) => console.log(error));
  };

  userSearch = (userSearchInput) => {
    newsApi
      .get(
        `everything?q=${userSearchInput}&sortBy=publishedAt&apiKey=8f47a48a41494480b72c7e5102db18ce`
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.setState({ news: response.data.articles });
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <div className="App-header">
          <div className="level">
            <div className="level-left app-name">CHANNEL MS NEWS</div>
            <div className="vl"></div>
            <div>
              <span className="short-app-name">CHANNEL MS NEWS</span>
            </div>
            <div className="weather">
              <Weather />
            </div>
            <div className="level-right clock">
              <Clock />
            </div>
            <div className="vl1"></div>
            <div className="smallClock">
              <Date />
            </div>
          </div>
        </div>
        <Search onSearchSubmit={this.userSearch} />
        <Switch>
          <Route exact path="/">
            <BreakingNews news={this.state.news} />
          </Route>
          <Route path="/category/:CategoryName" component={Category} />
          <Route path="/myaccount" component={MyAccount} />
          <Route path="/region" component={Region} />
        </Switch>
        <div>
          <SideMenu />
        </div>
      </div>
    );
  }
}
