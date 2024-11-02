import React, { Component } from "react";
import MedicineDataService from "../../services/medicine.service";
import { Link } from "react-router-dom";
import "../../css/medicines-list.css";
import styles from '..//../css/medicine-list-sorter.module.css';

export default class MedicinesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveMedicines = this.retrieveMedicines.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.searchName = this.searchName.bind(this);
    this.sortUp = this.sortUp.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);

    this.state = {
      medicines: [],
      order: "pass",
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveMedicines();
  }

  handleSortChange = (event) => {
    this.setState({
      order: event.target.value
    }, () => {
      this.refreshList();
    });
  };

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  sortUp() {
    MedicineDataService.getSortedUp()
    
    .then(response => {
      const updatedMedicines = response.data.map(medicine => ({
        ...medicine,
        image: "http://localhost:8080/" + medicine.image
      }));

      this.setState({
        medicines: updatedMedicines
        
      });
        console.log(updatedMedicines);
    })
    .catch(e => {
      console.log(e);
    });
  }

  sortDown() {
    MedicineDataService.getSortedDown()
    .then(response => {
      const updatedMedicines = response.data.map(medicine => ({
        ...medicine,
        image: "http://localhost:8080/" + medicine.image
      }));

      this.setState({
        medicines: updatedMedicines
        
      });
        console.log(updatedMedicines);
    })
    .catch(e => {
      console.log(e);
    });
  }

  retrieveMedicines = async () => {

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
  
    MedicineDataService.getAll()
      .then(response => {
        const updatedMedicines = response.data.map(medicine => ({
          ...medicine,
          image: "http://localhost:8080/" + medicine.image
        }));

        this.setState({
          medicines: updatedMedicines
          
        });
          console.log(updatedMedicines);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    if (this.state.order == "pass")
    {
      this.retrieveMedicines();
    }
    else if (this.state.order == "up")
    {
      this.sortUp();
    }
    else if (this.state.order == "down")
    {
      this.sortDown();
    }
  }

  searchName() {
    MedicineDataService.findByName(this.state.searchName)
      .then(response => {
        const updatedMedicines = response.data.map(medicine => ({
          ...medicine,
          image: "http://localhost:8080/" + medicine.image
        }));
        this.setState({
          medicines: updatedMedicines
        });
        console.log(updatedMedicines);
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  render() {
    const { searchName, medicines, order } = this.state;

    return (
      <div className="page-container">

<div className={styles.radioContainer}>
                <label className={styles.radioLabel}>
                    <input
                        type="radio"
                        value="pass"
                        checked={order === 'pass'}
                        onChange={this.handleSortChange}
                    />
                    По умолчанию
                </label>
                <label className={styles.radioLabel}>
                    <input
                        type="radio"
                        value="up"
                        checked={order === 'up'}
                        onChange={this.handleSortChange}
                    />
                    По возрастанию
                </label>
                <label className={styles.radioLabel}>
                    <input
                        type="radio"
                        value="down"
                        checked={order === 'down'}
                        onChange={this.handleSortChange}
                    />
                    По убыванию
                </label>
            </div>

        <div className="search-container">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={this.onChangeSearchName}
          />
          <button className="btn btn-outline-secondary" type="button" onClick={this.searchName}>
            Search
          </button>
        </div>

        {this.props.userIsAuth ? (
          <Link to="/medicines/add" className="add-medicine-link actionBtn">Добавить медикамент</Link>
        ) : (
          <p></p>
        )}     

        <div className="products-container">
          {medicines && medicines.map((medicine, index) => (
            <div className="product-card" key={index}>
              <img src={medicine.image[medicine.image.length - 1] == "/" ? medicine.image + "uploads/default.png" : medicine.image} alt="Product Image" className="product-image" />
              <h2 className="product-name">{medicine.name}</h2>
              <p className="product-price">{medicine.price} BYN</p>
              {medicine.discount ? (<p className="product-discount">Скидка: {medicine.discount}%</p>) : (<p></p>)}
              <Link to={"/medicines/" + medicine.id} className="product-link actionBtn">Подробнее</Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}