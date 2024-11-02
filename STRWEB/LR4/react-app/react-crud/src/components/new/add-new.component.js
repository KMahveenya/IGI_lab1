import React, { Component } from "react";
import NewDataService from "../../services/new.service";
import "../../css/add-medicine.css";
import axios from 'axios';
import { withRouter } from '../../common/with-router';

class AddNew extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.saveNew = this.saveNew.bind(this);

    this.state = {
      id: null,
      title: "",
      titleIsValid: false,
      description: "", 
      descriptionIsValid: false, 
      text: "",
      textIsValid: false, 
      image: null,
      imagePreview: null, 

      filePath: "",
    };
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

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
      titleIsValid: this.validateString(e.target.value)
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
      descriptionIsValid: this.validateString(e.target.value)
    });
  }

  onChangeText(e) {
    this.setState({
      text: e.target.value,
      textIsValid: this.validateString(e.target.value)
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

  saveNew = async () =>  {
    if (this.state.titleIsValid && this.state.descriptionIsValid && this.state.textIsValid)
    {
      var data = {
        title: this.state.title,
        description: this.state.description,
        text: this.state.text,
        image: "",
      };
      await this.saveImage()
      data.image = this.state.filePath;
      NewDataService.create(data)
        .then(response => {
          this.setState({
            id: response.data.id,
            title: response.data.title,
            description: response.data.description,
            text: response.data.text,
            image: response.data.image,
          });
          console.log(response.data);
          this.props.router.navigate("/medicines");
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
    var titleColor = this.state.titleIsValid===true?"green":"red";
    var descriptionColor = this.state.descriptionIsValid===true?"green":"red";
    var textColor = this.state.textIsValid===true?"green":"red";

    return (
      <div className="submit-form">
        {this.props.userIsAuth ? (
          <div>
          <div className="form-group">
            <h1>Новость</h1>

            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={this.state.title}
              onChange={this.onChangeTitle}
              name="title"
              style={{borderColor:titleColor}}
            />

            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={this.state.description}
              onChange={this.onChangeDescription}
              name="description"
              style={{borderColor:descriptionColor}}
            />

            <label htmlFor="text">Text</label>
            <input
              type="text"
              className="form-control"
              id="text"
              required
              value={this.state.text}
              onChange={this.onChangeText}
              name="text"
              style={{borderColor:textColor}}
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
          <div id="container"><button onClick={this.saveNew} className="actionBtn">Сохранить</button></div>
        </div>
        ) : (
          <p></p>
        )} 
      </div>
    );
  }
}

export default withRouter(AddNew);