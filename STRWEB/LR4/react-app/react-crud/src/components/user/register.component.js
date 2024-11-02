import React, { Component } from "react";
//import MedicineDataService from "../../services/medicine.service";
import { withRouter } from '../../common/with-router';
import { Link } from "react-router-dom";
import styles from '..//../css/UserRegister.module.css';

class UserRegister extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.registerUser = this.registerUser.bind(this);

    this.state = {
        username: "",
        password: "",

        usernameIsValid: false,
        passwordIsValid: false,

        message: ""
    };
  }

  validateUsername(str) {
    return str.length > 2;
  }

  validatePassword(str) {
    return str.length > 5;
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
      usernameIsValid: this.validateUsername(e.target.value)
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
      passwordIsValid: this.validatePassword(e.target.value)
    });
  }

  registerUser = async (e) => {
    const { username, password } = this.state;
    try {
        const response = await fetch('http://localhost:8080/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
          credentials: "include"
        });
        
        const data = await response.json();
        if (response.ok) {
            this.setState({ message: 'Вы успешно зарегистрировались' });
            console.log('Вы успешно зарегистрировались!!!');
        
            fetch("http://localhost:8080/protected", {
                method: "GET",
                credentials: "include"
            })
            .then((response) => {
                if (response.ok)
                {
                  this.props.setUserAuthStatus(true);
                }
                else
                {
                  this.props.setUserAuthStatus(false);
                }
            });
        
            this.props.router.navigate("/medicines");
        }
      }
    catch (error)
    {
        console.error('Error during registration:', error);
    }
  }

  render() {
    var usernameColor = this.state.usernameIsValid===true?"green":"red";
    var passwordColor = this.state.passwordIsValid===true?"green":"red";

    return (
      <div className={styles.registerContainer}>
          <form>
              <label className={styles.registerLabel} htmlFor="username">Username</label>
              <input
                  className={styles.registerInput}
                  type="text"
                  id="username"
                  required
                  onChange={this.onChangeUsername}
                  name="username"
              />

              <label className={styles.registerLabel} htmlFor="password">Password</label>
              <input
                  className={styles.registerInput}
                  type="password"
                  id="password"
                  required
                  onChange={this.onChangePassword}
                  name="password"
              />
          </form>
          <button className={styles.registerButton} onClick={this.registerUser}>Зарегистрироваться</button>
          <p className={styles.registerMessage}>{this.state.message ? this.state.message : ''}</p>
      </div>
    );
  }
}

export default withRouter(UserRegister);