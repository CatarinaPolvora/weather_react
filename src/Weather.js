import React, { useState } from "react";
import FormattedDate from "./FormattedDate"
import axios from "axios";

export default function Weather(props) {
  let [temperature, setTemperature] = useState(null);
  let [description, setDescription] = useState(null);
  let [wind, setWind] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [icon, setIcon] = useState(null);

  function showTemperature(response) {
    setDescription(response.data.weather[0].description);
    setWind(response.data.wind.speed);
    setHumidity(response.data.main.humidity);
    setTemperature(response.data.main.temp);
    setIcon (`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  }

  if (temperature) {
    return (
      <body>
        <div>
          <form>
            <input className="City" type="search" placeholder="Type a city" />
            <input className="Search" type="submit" value="Search" />
          </form>
          <button>Current Location</button>
          <h1 className="neonText">Lisbon</h1>
          <span>Last updated: <FormattedDate date={props.data.date}/>  </span>
          <br />
          <div className="row">
            <div className="col">
              
<img alt="weather-icon" src={icon} width="80px" />
            </div>
            <div className="col">
              <h2 className="neonText">{Math.round(temperature)}℃</h2>
              <h3 className="neonText">{description}</h3>
              <span>Humidity: {humidity}%</span> <br />
              <span>Wind: {wind} km/h</span>
            </div>
          </div>

          <div className="weather-forecast"></div>
        </div>
        <br />
      </body>
    );
  } else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=d4a6a488c953cc85e69ba334cc42f424&units=metric`;
    axios.get(url).then(showTemperature);
    return "Loading...";
  }
}
