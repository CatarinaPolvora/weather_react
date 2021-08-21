import React, { useState } from "react";
import axios from "axios";

export default function Weather (props) {

let [temperature, setTemperature] = useState(null);
  let [description, setDescription] = useState(null);
  let [wind, setWind] = useState(null);
  let [humidity, setHumidity] = useState(null);
let [icon, setIcon] = useState(null);

  function showTemperature(response) {
    setTemperature(response.data.main.temp);
    setDescription(response.data.weather.[0].description);
    setWind(response.data.wind.speed);
    setHumidity(response.data.main.humidity);
    setIcon (`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=d4a6a488c953cc85e69ba334cc42f424&units=metric`;
  axios.get(url).then(showTemperature);

  if (temperature) {
    return (
      <ul className="Form">
        {" "}
        <li> Temperature: {Math.round(temperature)} ℃ </li>
        <li> Description: {description} </li>
        <li> Humidity: {humidity} %</li>
        <li> Wind Speed: {wind} km/hr </li>
        <li> <img src={icon} alt={description} /></li>
      </ul>
    );
  } else {
    return "Loading...";
  }
}
