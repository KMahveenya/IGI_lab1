import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from '..//../css/weather.module.css';

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.getWeather = this.getWeather.bind(this);

    this.state = {
        weatherData: {},
    };
  }
  
  componentDidMount() {
    this.getWeather();
  }

  getWeather = async () => {
    const cities = ["Minsk", "Gomel", "Mogilev", "Vitebsk", "Grodno", "Brest"];
    const apiKey = '53463e2c2ed3172e0488ab9e52e72b44';
    const weatherData = {};

    for (let city of cities) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},BY&units=metric&appid=${apiKey}`);
            const data = await response.json();
            weatherData[city] = data;
        }
        catch (error)
        {
            console.error(`Ошибка получения данных для города ${city}:`, error);
        }
    }

    this.setState({ weatherData });
  }

  render() {
    const { weatherData } = this.state;
    
    return (
        <div className={styles.weatherContainer}>
            <ul className={styles.weatherList}>
                {Object.keys(weatherData).map((city) => (
                    <li key={city} className={styles.weatherItem}>
                        <h3 className={styles.cityName}>{city}</h3>
                        {weatherData[city].main ? (
                            <div className={styles.weatherDetails}>
                                <img
                                    className={styles.weatherIcon}
                                    src={`https://openweathermap.org/img/wn/${weatherData[city].weather[0].icon}@2x.png`}
                                    alt={weatherData[city].weather[0].description}
                                />
                                <p className={styles.temperature}>
                                    {weatherData[city].main.temp} °C
                                </p>
                            </div>
                        ) : (
                            <p className={styles.noData}>Данные недоступны</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
  }
}