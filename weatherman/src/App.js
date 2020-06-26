import React, { Component } from "react";

import weatherApi from "./apis/weatherApi";
import Search from "./components/Search";
import Weather from "./components/defaultWeather";

export default class App extends Component {
  state = {
    dailyData: []
  };

  userSearch = (userSearchInput) => {
    weatherApi
    .get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${userSearchInput}&units=metric&APPID=17652cc8c7de11ae1f955cc6761f37f5`
    )
      
    .then((response) => {
      if (response.status === 200) {
        const dailyData = response.data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
        this.setState({dailyData});
        console.log(this.state.dailyData)
      }
    })
    .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <div>Welcome to WeatherMan</div>
        <div>
          <Search onSearchSubmit = {this.userSearch} mayank ={function(abc) {
            console.log(abc)
          }}
          saurabh = "Hi !!"
          
          />
        </div>
        <div>
          <Weather />
        </div>
      </div>
    );
  }
}
