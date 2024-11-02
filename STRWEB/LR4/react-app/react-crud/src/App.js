import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import MedicinesList from "./components/medicine/medicine-list.component";
import AddMedicine from "./components/medicine/add-medicine.component";
import UpdateMedicine from "./components/medicine/update-medicine.component";
import Medicine from "./components/medicine/medicine.component";
import UserRegister from "./components/user/register.component";
import UserLogin from "./components/user/login.component";
import UserLogout from "./components/user/logout.component";
import Main from "./components/main.component";
import AddNew from "./components/new/add-new.component";
import AddStaff from "./components/staff/add-staff.component";
import NewsList from "./components/new/new-list.component";
import New from "./components/new/new.component";
import StaffList from "./components/staff/staff-list.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.checkUser = this.checkUser.bind(this);
    this.setUserAuthStatus = this.setUserAuthStatus.bind(this);

    this.state = {
        userIsAuth: null
    };
  }

  componentDidMount() {
    this.checkUser();
  }

  checkUser = async () => {
    await fetch("http://localhost:8080/protected", {
      method: "GET",
      credentials: "include"
    })
    .then((response) => {
      if (response.ok)
      {
        this.setState({
          userIsAuth: true
        });
        console.log("Пользователь авторизован");
      }
      else
      {
        this.setState({
          userIsAuth: false
        });
        console.log("Пользователь не авторизован");
      }
    });
  }

  setUserAuthStatus(isAuth) {
    this.setState({ userIsAuth: isAuth });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userIsAuth !== this.state.userIsAuth) {
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div>
        <nav>
          <div>
            <li>
              <Link to={"/index"}>
                Главная
              </Link>
            </li>
            <li>
              <Link to={"/medicines"}>
                Медикаменты
              </Link>
            </li>
            <li>
              <Link to={"/news"}>
                Новости
              </Link>
            </li>
            <li>
              <Link to={"/staff"}>
                Наш персонал
              </Link>
            </li>
            {this.state.userIsAuth ? (
              <li>
                <Link to={"/logout"}>
                  Выйти
                </Link>
              </li>
            ) : (
              <li>
                <Link to={"/login"}>
                  Войти
                </Link>
              </li>
            )}
          </div>
        </nav>

        <div id="wrapper">
          <div>
            <Routes>
              <Route path="/" element={<MedicinesList userIsAuth={this.state.userIsAuth}/>} />
              <Route path="/medicines/:id" element={<Medicine userIsAuth={this.state.userIsAuth}/>} />
              <Route path="/news/:id" element={<New userIsAuth={this.state.userIsAuth}/>} />
              <Route path="/medicines/:id/update" element={<UpdateMedicine userIsAuth={this.state.userIsAuth}/>} />
              <Route path="/medicines" element={<MedicinesList userIsAuth={this.state.userIsAuth}/>} />
              <Route path="/news" element={<NewsList userIsAuth={this.state.userIsAuth}/>} />
              <Route path="/medicines/add" element={<AddMedicine userIsAuth={this.state.userIsAuth}/>} />
              <Route path="/staff/add" element={<AddStaff userIsAuth={this.state.userIsAuth}/>} />
              <Route path="/staff" element={<StaffList userIsAuth={this.state.userIsAuth}/>} />
              <Route path="/register" element={<UserRegister setUserAuthStatus={this.setUserAuthStatus}/>} />
              <Route path="/login" element={<UserLogin setUserAuthStatus={this.setUserAuthStatus}/>} />
              <Route path="/logout" element={<UserLogout setUserAuthStatus={this.setUserAuthStatus}/>} />
              <Route path="/index" element={<Main userIsAuth={this.state.userIsAuth}/>} />
              <Route path="/news/add" element={<AddNew userIsAuth={this.state.userIsAuth}/>} />
            </Routes>
          </div>
        </div>
      </div>
    );
  }
}

export default App;