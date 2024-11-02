import React, { Component } from "react";
//import MedicineDataService from "../../services/medicine.service";
import { withRouter } from '../../common/with-router';
import { Link } from "react-router-dom";
import styles from "../../css/UserLogin.module.css";

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.loginGoogle = this.loginGoogle.bind(this);
    this.loginFacebook = this.loginFacebook.bind(this);

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

  loginGoogle = () => {
    window.location.href = 'http://localhost:8080/auth/google';
  }

  loginFacebook = () => {
    window.location.href = 'http://localhost:8080/auth/facebook';
  }

  loginUser = async (e) => {
    const { username, password } = this.state;
    try {
      const response = await fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
          credentials: "include"
      });

      const data = await response.json();
      if (response.ok)
      {
        this.setState({
          message: 'Вы успешно авторизировались'
        });
        this.props.setUserAuthStatus(true);
        this.props.router.navigate("/medicines");
      }
      else
      {
        this.setState({
          message: 'Ошибка авторизации. Проверьте вводимые данные.'
        });
        this.props.setUserAuthStatus(false);
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
        <div className={styles.authContainer}>
        <form>
            <label className={styles.authLabel} htmlFor="username">Username</label>
            <input
                className={styles.authInput}
                type="text"
                id="username"
                required
                onChange={this.onChangeUsername}
                name="username"
            />

            <label className={styles.authLabel} htmlFor="password">Password</label>
            <input
                className={styles.authInput}
                type="password"
                id="password"
                required
                onChange={this.onChangePassword}
                name="password"
            />
        </form>
        <button className={styles.authButton} onClick={this.loginUser}>Авторизироваться</button>
        <button className={styles.authButton} onClick={this.loginGoogle}>Авторизация с помощью Google</button>
        <button className={styles.authButton} onClick={this.loginFacebook}>Авторизация с помощью Facebook</button>
        <Link to="/register" className={styles.authLinkButton}>
            Зарегистрироваться
        </Link>
        <p className={styles.authMessage}>{this.state.message ? this.state.message : ''}</p>
    </div>
    );
  }
}

export default withRouter(UserLogin);