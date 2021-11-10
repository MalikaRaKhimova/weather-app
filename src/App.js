import './App.css';
import React, {useState} from 'react';
import sun from './sun.png'
import cloud from './cloudy.png'
import DateBuilder from './components/date';

const api = {
  key: "1f304838783d954c8ab2f1a1a631f30e",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  
  const search = event => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => 
        {setWeather(result); 
          setQuery('');
          console.log(result);})
        }
      }
  return (
    <div className={
      (typeof weather.main != "undefined") ? 
      ((weather.main.temp < 16) ? 'app warm' : 'app'): 'app'}>
      <main>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="info">
            <div className="info__left">
              <span className="info__degree">{Math.round(weather.main.temp)}</span>
            </div>
            <div className="info__right">
              <div className="info__row">
                  <span className="info__city">{weather.name}</span>
                  <span className="info__time mg">
                    <DateBuilder />
                  </span>
              </div>
              <div className="info__row">
                  <img className="info__logo" src={(typeof weather.main != "undefined") ? 
                            ((weather.main.temp > 16) ? sun : cloud): 'app'} alt="sunny" />
                  <span className="info__condition mg">{weather.weather[0].main}</span>
              </div>
            </div>
          </div>
          
        </div>
        ) : ('')}
        
        <div className="right-box">
          <div className="search-box">
            <input
            type="text"
            className="search-bar"
            placeholder="Search region..."
            onChange={e => setQuery(e.target.value)}
            value = {query}
            onKeyPress={search}
            />
          </div>
          {(typeof weather.main != "undefined") ? (
          <div className="list-box">
            <h2>Weather details</h2>
            <div className="list-row">
              <p className="text">Cloud</p>
              <p>{weather.clouds.all}%</p>
            </div>
            <div className="list-row">
              <p className="text">Humidity</p>
              <p>{weather.main.humidity}%</p>
            </div>
            <div className="list-row">
              <p className="text">Wind</p>
              <p>{weather.wind.speed}km/h</p>
            </div>
            <div className="list-row">
              <p className="text">Rain</p>
              <p>0mm</p>
            </div>
        </div>
    ) : ('')}
          </div>

      </main>
    </div>
  );

}

export default App;
