import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Students from './components/students/students';
import Teachers from './components/teachers/teachers';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showstudentComponent: false,
      showteacherComponent: false,
    };
    this.onstudentClick = this.onstudentClick.bind(this);
    this.onteacherClick = this.onteacherClick.bind(this);
  }

  onstudentClick() {
    this.setState({
      showstudentComponent: true,
    });
  }
  onteacherClick(){
    this.setState({
    	showteacherComponent: true,
      });  
  }
  render() {
    return (
      <div className="App">
        <header>
        </header>
        <button onClick={this.onstudentClick}>Students</button>
        {this.state.showstudentComponent ? <Students /> : null}
        <button onClick={this.onteacherClick}>Teachers</button>
        {this.state.showteacherComponent ? <Teachers /> : null}
      </div>
    );
  }
}

export default App;
