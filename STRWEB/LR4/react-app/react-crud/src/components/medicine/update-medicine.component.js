import React, { Component } from "react";
import MedicineDataService from "../../services/medicine.service";
import { withRouter } from '../../common/with-router';
import axios from 'axios';
import "../../css/update-medicine.css";

class UpdateMedicine extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeInstruction = this.onChangeInstruction.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeImagedel = this.onChangeImagedel.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDiscount = this.onChangeDiscount.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);

    this.getMedicine = this.getMedicine.bind(this);
    //this.updatePublished = this.updatePublished.bind(this);
    this.updateMedicine = this.updateMedicine.bind(this);
    this.deleteMedicine = this.deleteMedicine.bind(this);

    this.state = {
      currentMedicine: {
        id: null,
        name: "",
        description: "",
        instruction: "",
        image: "",
        discount: 0,
        price: 0,
        quantity: 0,
        category: ""
      },

      nameIsValid: true,
      descriptionIsValid: true,
      priceIsValid: true,
      discountIsValid: true,
      quantityIsValid: true,
      categoryIsValid: true,
      instructionIsValid: true,

      imagedel: false,
      imagePreview: null,
      message: "",
      filePath: "",
      newimage: ""
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

  componentDidMount() {
    this.getMedicine(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMedicine: {
          ...prevState.currentMedicine,
          name: name
        },
        nameIsValid: this.validateString(e.target.value)
      };
    });
  }

  onChangeImagedel(e) {
    this.state.imagedel = !this.state.imagedel;
  }

  onChangeQuantity(e) {
    const quantity = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMedicine: {
          ...prevState.currentMedicine,
          quantity: quantity
        },
        quantityIsValid: this.validateNumberEqual(e.target.value)
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentMedicine: {
        ...prevState.currentMedicine,
        description: description
      },
      descriptionIsValid: this.validateString(e.target.value)
    }));
  }

  onChangeCategory(e) {
    const category = e.target.value;
    
    this.setState(prevState => ({
      currentMedicine: {
        ...prevState.currentMedicine,
        category: category
      },
      categoryIsValid: this.validateString(e.target.value)
    }));
  }

  onChangeInstruction(e) {
    const instruction = e.target.value;
    
    this.setState(prevState => ({
      currentMedicine: {
        ...prevState.currentMedicine,
        instruction: instruction
      },
      instructionIsValid: this.validateString(e.target.value)
    }));
  }

  onChangePrice(e) {
    const price = e.target.value;
    
    this.setState(prevState => ({
      currentMedicine: {
        ...prevState.currentMedicine,
        price: price
      },
      priceIsValid: this.validateNumber(e.target.value)
    }));
  }

  onChangeImage(e) {
    const file = e.target.files[0];
    if (file) {
      this.state.newimage = file;
  
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ imagePreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onChangeDiscount(e) {
    const discount = e.target.value;
    
    this.setState(prevState => ({
      currentMedicine: {
        ...prevState.currentMedicine,
        discount: discount
      },
      discountIsValid: this.validateNumberEqual(e.target.value)
    }));
  }

  getMedicine(id) {
    MedicineDataService.get(id)
      .then(response => {
        this.setState({
          currentMedicine: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

saveImage = async () => {
  if (this.state.newimage) {
    const formData = new FormData();
    formData.append("image", this.state.newimage);

    const resdat = await axios.post('http://localhost:8080/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    this.state.currentMedicine.image = resdat.data.filePath;
  }
}

  updateMedicine = async () => {

    if (this.state.newimage || this.state.imagedel)
    {
      await this.deleteImage(this.state.currentMedicine.image);
    }

    await this.saveImage();
    //this.state.currentMedicine.image = this.state.filePath;

    MedicineDataService.update(
      this.state.currentMedicine.id,
      this.state.currentMedicine
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Medicine был успешно обновлен!"
        });
      })
      .catch(e => {
        console.log(e);
      });
      this.props.router.navigate('/medicines');
  }

  deleteImage = async (imageName) => {
    try
    {
      let path = `http://localhost:8080/${imageName}`;
      const response = await axios.delete(path);
      console.log(response.data.message);
      this.state.currentMedicine.image = "";
    }
    catch (error)
    {
      console.error('Ошибка при удалении изображения:', error);
    }
  };

  deleteMedicine() {
    if (this.state.currentMedicine.image)
    {
      this.deleteImage(this.state.currentMedicine.image);
    }
    
    MedicineDataService.delete(this.state.currentMedicine.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/medicines');
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  render() {
    const { currentMedicine: currentMedicine } = this.state;

    var nameColor = this.state.nameIsValid===true?"green":"red";
    var descriptionColor = this.state.descriptionIsValid===true?"green":"red";
    var categoryColor = this.state.categoryIsValid===true?"green":"red";
    var instructionColor = this.state.instructionIsValid===true?"green":"red";
    var priceColor = this.state.priceIsValid===true?"green":"red";
    var discountColor = this.state.discountIsValid===true?"green":"red";
    var quantityColor = this.state.quantityIsValid===true?"green":"red";

    return (
      
      <div>
        {this.props.userIsAuth ? (
        <div className="edit-form">
        <h4>Medicine</h4>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={currentMedicine.name}
              onChange={this.onChangeName}
              style={{borderColor:nameColor}}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={currentMedicine.description}
              onChange={this.onChangeDescription}
              style={{borderColor:descriptionColor}}
            />
          </div>
          <div className="form-group">
            <label htmlFor="instruction">Instruction</label>
            <input
              type="text"
              className="form-control"
              id="instruction"
              value={currentMedicine.instruction}
              onChange={this.onChangeInstruction}
              style={{borderColor:instructionColor}}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              className="form-control"
              id="category"
              value={currentMedicine.category}
              onChange={this.onChangeCategory}
              style={{borderColor:categoryColor}}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={currentMedicine.price}
              onChange={this.onChangePrice}
              style={{borderColor:priceColor}}
            />
          </div>
          <div className="form-group">
            <label htmlFor="discount">Discount</label>
            <input
              type="number"
              className="form-control"
              id="discount"
              value={currentMedicine.discount}
              onChange={this.onChangeDiscount}
              style={{borderColor:discountColor}}
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              value={currentMedicine.quantity}
              onChange={this.onChangeQuantity}
              style={{borderColor:quantityColor}}
            />
          </div>
          <div className="form-group">
            <label htmlFor="delimage">Delete image</label>
            <input
              type="checkbox"
              id="delimage"
              required
              onChange={this.onChangeImagedel}
              name="delimage"
            />
          </div>
          <div className="form-group">
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
        </form>
        
        <button
          className="badge badge-danger mr-2"
          onClick={this.deleteMedicine}
        >
          Delete
        </button>

        <button
          type="submit"
          className="badge badge-success"
          onClick={this.updateMedicine}
        >
          Update
        </button>
      </div>
      ) : (
        <p></p>
      )} 
      </div>
    );
  }
}

export default withRouter(UpdateMedicine);