import React, { Component } from "react";
//import MedicineDataService from "../../services/medicine.service";
import { Link, Routes, Route } from "react-router-dom";
//import "../../css/medicines-list.css";
import Weather from "../components/api/weather.component";
import Joke from "../components/api/joke.component";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: new Date(),
      userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }
  
  componentDidMount() {
    this.intervalId = setInterval(() => {
        this.setState({ currentTime: new Date() });
    }, 1000); // Обновление каждую секунду
  }

  componentWillUnmount() {
    clearInterval(this.intervalId); // Очистка при размонтировании
  }

  formatDate = (date, timeZone) => {
    return new Intl.DateTimeFormat('ru-RU', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(date);
  };

  render() {
    const { currentTime, userTimeZone } = this.state;
    
    return (
      <div>
        <h2 style={{textAlign: "center"}}>Погода в областных городах Беларуси</h2>
        {this.props.userIsAuth ? (
            <Weather/>
        ) : (
            <p>Использование API недоступно, авторизируйтесь</p>
        )}
        
        <h2 style={{textAlign: "center"}}>Шутка</h2>
        {this.props.userIsAuth ? (
            <Joke/>
        ) : (
            <p>Использование API недоступно, авторизируйтесь</p>
        )}
        <div>
            <h1>Текущая информация о времени</h1>
            <p><strong>Текущая тайм-зона пользователя:</strong> {userTimeZone}</p>
            <p><strong>Текущая дата и время:</strong> {this.formatDate(currentTime, userTimeZone)}</p>
            <p><strong>Текущая дата и время в UTC:</strong> {this.formatDate(currentTime, 'UTC')}</p>
        </div>
      </div>
    );
  }
}