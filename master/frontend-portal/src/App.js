import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';


import './App.css';
import Students from './components/students/students';
import AddStudent from './components/students/addStudent';
import Teachers from './components/teachers/teachers';
import AddTeacher from './components/teachers/addTeacher';
import Admin from './components/admin';
import Login from './components/login/login';
//import Admin from './components/home/admin'
import {ProtectedRoute} from './components/ProtectedRoute';

class App extends Component {
  constructor() {
    super();
  }


  render() {
    return (
      <div className="App">
        <Switch>
	      	//<Route exact path="/login" component={Login} />
        	<Route exact path="/admin" component={Admin} />
	        <ProtectedRoute exact path="/" component={Admin} />
	        <ProtectedRoute exact path="/students" component={Students} />
	        <ProtectedRoute exact path="/teachers" component={Teachers} />
	        <ProtectedRoute path="/addStudent" component={AddStudent} />
	        <ProtectedRoute path="/addTeacher" component={Teachers} />
	</Switch>
      </div>
    );
  }
}

export default App;
