import React, { Component } from "react";
import StaffDataService from "../../services/staff.service";
import { Link } from "react-router-dom";
//import "../../css/medicines-list.css";
import styles from '..//../css/new.module.css';

function OneStaff(props) {
    return (
        <div className={styles.container}>
        <img
            className={styles.image}
            src={props.image[props.image.length - 1] === "/" ? props.image + "uploads/noAvatar.png" : props.image}
            alt="Staff Image"
        />
        <div className={styles.content}>
            <h2 className={styles.title}>{props.surname} {props.firstname} {props.lastname}</h2>
            <p className={styles.description}>Должность: {props.position}</p>
            <p className={styles.description}>Почта: {props.email}</p>
        </div>
    </div>
    );
}

export default class StaffList extends Component {
  constructor(props) {
    super(props);
    this.retrieveStaff = this.retrieveStaff.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      staff: []
    };
  }

  componentDidMount() {
    this.retrieveStaff();
  }

  retrieveStaff = async () => {

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

    StaffDataService.getAll()
      .then(response => {
        const updatedStaff = response.data.map(staff => ({
          ...staff,
          image: "http://localhost:8080/" + staff.image
        }));

        this.setState({
          staff: updatedStaff
          
        });
          console.log(updatedStaff);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveStaff();
  }
  
  render() {
    const { staff: staff } = this.state;

    return (
      <div>
        <div className={styles.centerdiv}>
          {this.props.userIsAuth ? (
            <Link className={styles.btn} to="/staff/add">Добавить сотрудника</Link>
          ) : (
            <p></p>
          )} 
        </div>
        <div>
          {staff && staff.map((staff, index) => (
            <OneStaff firstname={staff.firstname} lastname={staff.lastname} image={staff.image} surname={staff.surname} key={index} id={staff.id} position={staff.position} email={staff.email}/>
          ))}
        </div>
      </div>
    );
  }
}