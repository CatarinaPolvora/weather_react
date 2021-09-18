import React, { useState } from "react";
import Temperature from "./Temperature";
import FormattedDate from "./FormattedDate";
import WeatherForecast from "./WeatherForecast";
import WeatherIcon from "./WeatherIcon";
import axios from "axios";

export default function Weather(props) {
  let [temperature, setTemperature] = useState(null);
  let [description, setDescription] = useState(null);
  let [wind, setWind] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [icon, setIcon] = useState(null);
  let [date, setDate] = useState(null);
   let [city, setCity] = useState(props.city);
   let [tempCity, setTempCity] = useState("");
   let [coordinates, setCoordinates] = useState(null);
  

  function showTemperature(response) {
    setDescription(response.data.weather[0].description);
    setWind(response.data.wind.speed);
    setHumidity(response.data.main.humidity);
    setIcon(
      response.data.weather[0].icon
    );
    setCoordinates(response.data.coord);
    setTemperature(response.data.main.temp);
    setDate(new Date(response.data.dt * 1000));
  }
  
function search(){
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d4a6a488c953cc85e69ba334cc42f424&units=metric`;
    axios.get(url).then(showTemperature);
}

  function handleSubmit(event) {
    event.preventDefault();
    setCity(tempCity);
    
    search();
  }

  function updateCity(event) {
        setTempCity(event.target.value);}

  if (temperature && date) {
    return (
      <body>
        <div>
        <form onSubmit={handleSubmit}>
        <input className="City" type="search" placeholder="Type a city" onChange={updateCity} />
            <input className="Search" type="submit" value="Search" />
          </form>
          
          <h1 className="neonText">{city}</h1>
          <span>
            Last updated: <FormattedDate date={date} />{" "}
          </span>
          <br />
          <div className="row">
            <div className="col">
              <WeatherIcon mt-5 code={icon} size={120} className="icon"/>
            </div>
            <div className="col">
              <h2 className="neonText"><Temperature celsius={temperature}/></h2>
              <h3 className="neonText">{description}</h3>
              <span>Humidity: {humidity}%</span> <br />
              <span>Wind: {wind} km/h</span>
            </div>
          </div>

          <WeatherForecast coordinates={coordinates} />
        </div>
        <br />
      </body>
    );
  } else {
    
    search();
    return "Loading...";
  }
}
