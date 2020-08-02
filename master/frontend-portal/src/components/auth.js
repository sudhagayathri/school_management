import React, { Component } from 'react';
import axios from 'axios';

class Auth extends Component {
  constructor(props) {
	  super(props)
    this.authenticated = false;
  }
  login(cb) {
    this.authenticated = true;
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
	  axios.get('http://localhost:8086/authenticate',{withCredentials: true})
      .then(res => {
    	  console.log(res)
    	 this.authenticated = res.data;
    	 return res.data;
      }); 
  }
}

export default new Auth();
