import React, { Component } from "react";
import { Link } from "react-router-dom";
//import styles from '..//../css/weather.module.css';

export default class Joke extends Component {
  constructor(props) {
    super(props);
    this.getJoke = this.getJoke.bind(this);

    this.state = {
        joke: '',
        loading: true,
        error: null,
    };
  }
  
  componentDidMount() {
    this.getJoke();
  }

  getJoke = async () => {
    try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        if (!response.ok)
        {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.setState({ joke: data.setup + ' ' + data.punchline, loading: false });
    }
    catch (error)
    {
        this.setState({ error: error.message, loading: false });
    }
  }

  render() {
    const { joke, loading, error } = this.state;
    
    if (loading)
    {
        return <p>Загрузка шутки...</p>;
    }

    if (error)
    {
        return <p>Ошибка: {error}</p>;
    }

    return (
        <div>
            <p>{joke}</p>
        </div>
    );
  }
}