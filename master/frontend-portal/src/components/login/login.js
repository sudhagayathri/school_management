import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";

import Admin from '../admin';

import axios from 'axios';


class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			email: "",
			password: "",
			errormsg: ""
		}
		this.onChange = this.onChange.bind(this);
		this.newlogin = this.newlogin.bind(this);
	}
	onChange(e){
		this.setState({
			[e.target.name]:e.target.value
		})
	}
	newlogin(e){
		var postData = {
			email : this.state.email,
			password : this.state.password
		}
		let axiosConfig = {
				withCredentials: true
		};
		axios.post('http://localhost:8086/login', postData, axiosConfig)
		.then((res) => {
		  if(typeof res.data.id != "undefined"){
			  this.props.history.push("/admin");
		  }
		  else if(typeof res.data.message != "undefined"){
			  this.setState({errormsg:res.data.message})
		  }
		})
	}

  render() {
    return (
       	<div>
      	<h1>Login</h1>
      	<input type="text" placeholder="email" name = "email" value ={this.state.email} onChange = {this.onChange} />
      	<br/>
      	<input type="text" placeholder="password" name = "password" value ={this.state.password} onChange = {this.onChange} />
      	<br/>
      	<button onClick ={this.newlogin}>Login</button>
      	<p class="errormsg">{this.state.errormsg}</p>
      </div>
    );
  }
}

export default Login;
