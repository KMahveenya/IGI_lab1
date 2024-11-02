import React, { Component } from "react";
//import MedicineDataService from "../../services/medicine.service";
import { withRouter } from '../../common/with-router';
import { Link } from "react-router-dom";
//import "../../medicine.css";

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);

    this.state = {
        message: ""
    };
  }

  componentDidMount() {
    this.logoutUser();
  }

  logoutUser = async (e) => {
    const { username, password } = this.state;

    try
    {
        const response = await fetch('http://localhost:8080/logout', {
            method: 'POST',
            credentials: "include"
        });

        if (response.ok)
        {
            console.log('Logout successful');
            this.props.setUserAuthStatus(false);
        }
        else
        {
            console.error('Logout failed');
            this.props.setUserAuthStatus(true);
        }
        this.props.router.navigate("/medicines");
    }
    catch (error)
    {
        console.error('Error during registration:', error);
    }
  }

  render() {

    return (
        <p>qqq</p>
    );
  }
}

export default withRouter(UserLogin);