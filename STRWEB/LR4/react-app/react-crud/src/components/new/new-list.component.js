import React, { Component } from "react";
import NewDataService from "../../services/new.service";
import { Link } from "react-router-dom";
//import "../../css/medicines-list.css";
import styles from '..//../css/new.module.css';

function OneNew(props) {
    return (
        <div className={styles.container}>
        <img
            className={styles.image}
            src={props.image[props.image.length - 1] === "/" ? props.image + "uploads/default.png" : props.image}
            alt="New Image"
        />
        <div className={styles.content}>
            <h2 className={styles.title}>{props.title}</h2>
            <p className={styles.description}>Описание: {props.description}</p>
            <Link to={"/news/" + props.id} className={styles.link}>Подробнее</Link>
        </div>
    </div>
    );
}

export default class NewsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveNews = this.retrieveNews.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      news: []
    };
  }

  componentDidMount() {
    this.retrieveNews();
  }

  retrieveNews = async () => {

    /*fetch("http://localhost:8080/protected", {
      method: "GET",
      credentials: "include"
    })
    .then((response) => {
      if (response.ok) {
          //alert(true); // Пользователь авторизован
      } else {
          //alert(false); // Пользователь не авторизован
      }
    });*/

    NewDataService.getAll()
      .then(response => {
        const updatedMNews = response.data.map(mynew => ({
          ...mynew,
          image: "http://localhost:8080/" + mynew.image
        }));

        this.setState({
          news: updatedMNews
          
        });
          console.log(updatedMNews);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveNews();
  }
  
  render() {
    const { news } = this.state;

    return (
      <div>
        <div className={styles.centerdiv}>
          {this.props.userIsAuth ? (
            <Link className={styles.btn} to="/news/add">Добавить новость</Link>
          ) : (
            <p></p>
          )} 
        </div>
        <div>
          {news && news.map((mynew, index) => (
            <OneNew title={mynew.title} text={mynew.text} image={mynew.image} description={mynew.description} key={index} id={mynew.id}/>
          ))}
        </div>
      </div>
    );
  }
}