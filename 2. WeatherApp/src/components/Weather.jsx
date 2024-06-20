import React, { useEffect, useRef, useState } from 'react'
import './weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import clouds_icon from '../assets/clouds.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import mist_icon from '../assets/mist.png'
import snow_icon from '../assets/snow.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'

function Weather() {

    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false)

    const search = async (city_name)=>{

        if (city_name === "") {
            alert("Field can not be empty!");
            return;
        }

        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                alert(data.message);
                return;
            }

            const icon = data.weather[0].icon
            setWeatherData({
                humidity: data.main.humidity,
                wind_speed: data.wind.speed,
                temp: Math.floor(data.main.temp),
                location: data.name,
                icon: `https://openweathermap.org/img/wn/${icon}@2x.png`

            })

        } catch (error){
            setWeatherData(false)
            console.error("Error while fetching data")
        }
    }

    useEffect(()=>{
        search("Surat");
    },[])

  return (
      <>
          <div className="card">
              <div className="search">
                  <input type="text" ref={inputRef} placeholder="Enter city name" spellcheck="false" />
                  <button onClick={()=> search(inputRef.current.value)}><img src={search_icon} /></button>
              </div>
              <div className="error">
                  <p>Invalid city name</p>
              </div>
              <div className="weather">
                  <img src={weatherData.icon} className="weather-icon" />
                  <h1 className="temp">{weatherData.temp}°C</h1>
                  <h2 className="city">{weatherData.location}</h2>
                  <div className="details">
                      <div className="col">
                          <img src={humidity_icon} />
                          <div>
                              <p className="humidity">{weatherData.humidity}%</p>
                              <p>Humidity</p>
                          </div>
                      </div>
                      <div className="col">
                          <img src={wind_icon} />
                          <div>
                              <p className="wind">{weatherData.wind_speed} km/h</p>
                              <p>Wind Speed</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </>
  )
}

export default Weather
