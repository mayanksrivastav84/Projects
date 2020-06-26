import React, { Component } from "react";
import weatherApi from "../apis/weatherApi";

export default class App extends Component {
  
  state = {
    defaultweather: [],
  };

  componentDidMount = () => {
    weatherApi
      .get(
        "data/2.5/weather?q=Amsterdam&units=metric&appid=17652cc8c7de11ae1f955cc6761f37f5"
      )
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          this.setState({ defaultweather: response.data.main});
          console.log(this.state.defaultweather)
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <p>{this.state.defaultweather.temp}<span>&#176;</span>C</p>
      </div>
    )}
  }