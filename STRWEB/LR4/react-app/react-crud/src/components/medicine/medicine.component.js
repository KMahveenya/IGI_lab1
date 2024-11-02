import React, { Component } from "react";
import MedicineDataService from "../../services/medicine.service";
import { withRouter } from '../../common/with-router';
import { Link } from "react-router-dom";
import "../../css/medicine.css";

class Medicine extends Component {
  constructor(props) {
    super(props);

    this.getMedicine = this.getMedicine.bind(this);

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
        category: "",

        createdAt: null,
        updatedAt: null,
      },
      message: "",
      userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }

  componentDidMount() {
    this.getMedicine(this.props.router.params.id);
  }

  getMedicine(id) {
    MedicineDataService.get(id)
      .then(response => {
        
        response.data.image = "http://localhost:8080/" + response.data.image;

        this.setState({
          currentMedicine: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  formatDate = (dateString, timeZone) => {
    const date = new Date(dateString);
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
    const { currentMedicine: currentMedicine, userTimeZone } = this.state;

    return (
      <div>
        <div className="product">
          <img src={currentMedicine.image[currentMedicine.image.length - 1] == "/" ? currentMedicine.image + "uploads/default.png" : currentMedicine.image} alt="Товар" className="product-image-self"/>
          <div className="product-info">
              <h2 className="product-name">{currentMedicine.name}</h2>
              <p className="product-category">{currentMedicine.category}</p>
              {currentMedicine.discount ? 
              (
                <div className="product-pricing">
                  <span className="old-price">{currentMedicine.price} BYN</span>
                  <span className="new-price">{(currentMedicine.price - currentMedicine.price * currentMedicine.discount / 100).toFixed(2)} BYN</span>
                </div>
              ) : (
                <div className="product-pricing">
                  <span className="price">{currentMedicine.price} BYN</span>
                </div>
              )
              }
              <p className="product-quantity">В наличии: {currentMedicine.quantity} шт.</p>
          </div>
          
        </div>
        <div className="product-description">
          <h3>Инструкция</h3>
          <p>{currentMedicine.instruction}</p>
          <h3>Описание</h3>
          <p>{currentMedicine.description}</p>
        </div>
        <p><strong>Время создания:</strong> {this.formatDate(currentMedicine.createdAt, userTimeZone)}</p>
        <p><strong>Время создания в UTC:</strong> {this.formatDate(currentMedicine.createdAt, 'UTC')}</p>
        <p><strong>Время обновления:</strong> {this.formatDate(currentMedicine.updatedAt, userTimeZone)}</p>
        <p><strong>Время обновления в UTC:</strong> {this.formatDate(currentMedicine.updatedAt, 'UTC')}</p>
        {this.props.userIsAuth ? (
          <div className="editBtn-container">
            <Link onClick={this.updateMedicine} className="editBtn" to={"/medicines/" + currentMedicine.id + "/update"}>
                Редактировать
            </Link>
          </div>
        ) : (
          <p></p>
        )} 
      </div>
    );
  }
}

export default withRouter(Medicine);