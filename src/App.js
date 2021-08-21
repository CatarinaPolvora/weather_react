
import './App.css';
import ReactAnimatedWeather from 'react-animated-weather';
import Weather from "./Weather"

function App() {
  return (
    <div className="App">
      <header className="App-header">
         <ReactAnimatedWeather
        icon="CLEAR_NIGHT"
        color="indigo"
        size={100}
        animate={true}
      />
       <h1>Lisbon</h1>
        <Weather city="Lisbon"/>
      </header>
    </div>
  );
}

export default App;
