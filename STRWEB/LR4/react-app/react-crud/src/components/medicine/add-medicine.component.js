import React, { Component } from "react";
import MedicineDataService from "../../services/medicine.service";
import "../../css/add-medicine.css";
import axios from 'axios';
import { withRouter } from '../../common/with-router';

class AddMedicine extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeInstruction = this.onChangeInstruction.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeDiscount = this.onChangeDiscount.bind(this);
    this.saveMedicine = this.saveMedicine.bind(this);

    this.state = {
      id: null,
      name: "",
      nameIsValid: false,
      description: "", 
      descriptionIsValid: false, 
      category: "",
      categoryIsValid: false, 
      instruction: "", 
      instructionIsValid: false,
      image: null,
      imagePreview: null, 
      price: 0, 
      priceIsValid: false,
      quantity: 0,
      quantityIsValid: true,
      discount: 0, 
      discountIsValid: true,

      filePath: "",
    };
  }

  validateString(str) {
    return str.length > 2;
  }

  validateNumber(value) {
    return value > 0;
  }

  validateNumberEqual(value) {
    return value >= 0;
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

  onChangeName(e) {
    this.setState({
      name: e.target.value,
      nameIsValid: this.validateString(e.target.value)
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
      descriptionIsValid: this.validateString(e.target.value)
    });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value,
      categoryIsValid: this.validateString(e.target.value)
    });
  }

  onChangeInstruction(e) {
    this.setState({
      instruction: e.target.value,
      instructionIsValid: this.validateString(e.target.value)
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value,
      priceIsValid: this.validateNumber(e.target.value)
    });
  }

  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value,
      quantityIsValid: this.validateNumber(e.target.value)
    });
  }

  onChangeDiscount(e) {
    this.setState({
      discount: e.target.value,
      discountIsValid: this.validateNumberEqual(e.target.value)
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

  saveMedicine = async () =>  {
    if (this.state.nameIsValid && this.state.descriptionIsValid && this.state.instructionIsValid && this.state.priceIsValid && this.state.categoryIsValid && this.state.discountIsValid && this.state.quantityIsValid)
    {
      var data = {
        name: this.state.name,
        description: this.state.description,
        instruction: this.state.instruction,
        price: this.state.price,
        quantity: this.state.quantity,
        image: "",
        discount: this.state.discount,
        category: this.state.category
      };
      await this.saveImage()
      data.image = this.state.filePath;
      MedicineDataService.create(data)
        .then(response => {
          this.setState({
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
            price: response.data.price,
            quantity: response.data.quantity,
            discount: response.data.discount,
            instruction: response.data.instruction,
            category: response.data.category,
            image: response.data.image,
          });
          console.log(response.data);
          this.props.router.navigate("/medicines");
        })
        .catch(e => {
          console.log(e);
        });
  
      //this.props.router.navigate("/medicines");
    }
    else
    {
      alert("Форма заполнена неверно!");
    }
  }

  render() {
    var nameColor = this.state.nameIsValid===true?"green":"red";
    var descriptionColor = this.state.descriptionIsValid===true?"green":"red";
    var categoryColor = this.state.categoryIsValid===true?"green":"red";
    var instructionColor = this.state.instructionIsValid===true?"green":"red";
    var priceColor = this.state.priceIsValid===true?"green":"red";
    var discountColor = this.state.discountIsValid===true?"green":"red";
    var quantityColor = this.state.quantityIsValid===true?"green":"red";

    return (
      <div className="submit-form">
        {this.props.userIsAuth ? (
          <div>
          <div className="form-group">
            <h1>Mедикамент</h1>

            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={this.state.name}
              onChange={this.onChangeName}
              name="name"
              style={{borderColor:nameColor}}
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

            <label htmlFor="instruction">Instruction</label>
            <input
              type="text"
              className="form-control"
              id="instruction"
              required
              value={this.state.instruction}
              onChange={this.onChangeInstruction}
              name="instruction"
              style={{borderColor:instructionColor}}
            />

            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              required
              step="0.01"
              value={this.state.price}
              onChange={this.onChangePrice}
              name="price"
              style={{borderColor:priceColor}}
            />

            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              required
              value={this.state.quantity}
              onChange={this.onChangeQuantity}
              name="quantity"
              style={{borderColor:quantityColor}}
            />

            <label htmlFor="category">Category</label>
            <input
              type="text"
              className="form-control"
              id="category"
              required
              value={this.state.category}
              onChange={this.onChangeCategory}
              name="category"
              style={{borderColor:categoryColor}}
            />

            <label htmlFor="discount">Discount</label>
            <input
              type="number"
              className="form-control"
              id="discount"
              required
              step="0.01"
              value={this.state.discount}
              onChange={this.onChangeDiscount}
              name="discount"
              style={{borderColor:discountColor}}
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
          <div id="container"><button onClick={this.saveMedicine} className="actionBtn">Сохранить</button></div>
        </div>
        ) : (
          <p></p>
        )} 
      </div>
    );
  }
}

export default withRouter(AddMedicine);