import React, { Component } from "react";
import StaffDataService from "../../services/staff.service";
//import "../../css/add-medicine.css";
import axios from 'axios';
import { withRouter } from '../../common/with-router';

class AddStaff extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.saveStaff = this.saveStaff.bind(this);

    this.state = {
      id: null,
      firstname: "",
      firstnameIsValid: false,
      surname: "", 
      surnameIsValid: false, 
      lastname: "",
      lastnameIsValid: false, 
      email: "",
      emailIsValid: false, 
      position: "",
      positionIsValid: false, 
      image: null,
      imagePreview: null, 

      filePath: "",
    };
  }

  validateEmail(email) {
      const emailPattern = /^\w+@\w+\.com$/;
      return emailPattern.test(email);
  }

  validateString(str) {
    return str.length > 2;
  }

  onChangeImage(e) {
    const file = e.target.files[0];
    if (file) {
      this.setState({ image: file });
  
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ imagePreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onChangeFirstname(e) {
    this.setState({
      firstname: e.target.value,
      firstnameIsValid: this.validateString(e.target.value)
    });
  }

  onChangeLastname(e) {
    this.setState({
      lastname: e.target.value,
      lastnameIsValid: this.validateString(e.target.value)
    });
  }

  onChangeSurname(e) {
    this.setState({
      surname: e.target.value,
      surnameIsValid: this.validateString(e.target.value)
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
      emailIsValid: this.validateString(e.target.value) && this.validateEmail(e.target.value)
    });
  }

  onChangePosition(e) {
    this.setState({
      position: e.target.value,
      positionIsValid: this.validateString(e.target.value)
    });
  }

  saveImage = async () => {
    if (this.state.image) {
      const formData = new FormData();
      formData.append("image", this.state.image);

      const resdat = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      this.state.filePath = resdat.data.filePath;
    }
  }

  saveStaff = async () =>  {
    if (this.state.firstnameIsValid && this.state.lastnameIsValid && this.state.surnameIsValid && this.state.positionIsValid && this.state.emailIsValid)
    {
      var data = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        surname: this.state.surname,
        email: this.state.email,
        position: this.state.position,
        image: "",
      };
      await this.saveImage()
      data.image = this.state.filePath;
      StaffDataService.create(data)
        .then(response => {
          this.setState({
            id: response.data.id,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            surname: response.data.surname,
            email: response.data.email,
            position: response.data.position,
            image: response.data.image,
          });
          console.log(response.data);
          this.props.router.navigate("/staff");
        })
        .catch(e => {
          console.log(e);
        });
    }
    else
    {
      alert("Форма заполнена неверно!");
    }
  }

  render() {
    var firstnameColor = this.state.firstnameIsValid===true?"green":"red";
    var lastnameColor = this.state.lastnameIsValid===true?"green":"red";
    var surnameColor = this.state.surnameIsValid===true?"green":"red";
    var positionColor = this.state.positionIsValid===true?"green":"red";
    var emailColor = this.state.emailIsValid===true?"green":"red";

    return (
      <div className="submit-form">
        {this.props.userIsAuth ? (
          <div>
          <div className="form-group">
            <h1>Сотрудник</h1>

            <label htmlFor="surname">Фамилия</label>
            <input
              type="text"
              className="form-control"
              id="surname"
              required
              value={this.state.surname}
              onChange={this.onChangeSurname}
              name="surname"
              style={{borderColor:surnameColor}}
            />

            <label htmlFor="firstname">Имя</label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              required
              value={this.state.firstname}
              onChange={this.onChangeFirstname}
              name="firstname"
              style={{borderColor:firstnameColor}}
            />

            <label htmlFor="lastname">Отчество</label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              required
              value={this.state.lastname}
              onChange={this.onChangeLastname}
              name="lastname"
              style={{borderColor:lastnameColor}}
            />

            <label htmlFor="position">Должность</label>
            <input
              type="text"
              className="form-control"
              id="position"
              required
              value={this.state.position}
              onChange={this.onChangePosition}
              name="position"
              style={{borderColor:positionColor}}
            />

            <label htmlFor="email">Почта</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={this.state.email}
              onChange={this.onChangeEmail}
              name="email"
              style={{borderColor:emailColor}}
            />

            <label htmlFor="image">Image</label>
            <input
              type="file"
              className="form-control"
              id="image"
              required
              onChange={this.onChangeImage}
              name="image"
            />
          </div>
          <div id="container"><button onClick={this.saveStaff} className="actionBtn">Сохранить</button></div>
        </div>
        ) : (
          <p></p>
        )} 
      </div>
    );
  }
}

export default withRouter(AddStaff);