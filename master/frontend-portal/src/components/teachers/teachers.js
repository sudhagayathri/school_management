import React, { Component } from 'react';
//import logo from './logo.svg';
import './teachers.css';

class Teachers extends Component {
	constructor(){
		super();
		this.state = {
			teachers:[]
		}
	}
	componentDidMount(){
		fetch('/teacher')
			.then(res => res.json())
			.then(teachersdata => this.setState({teachers:teachersdata}));
	}
	
  render() {
    return (
      <div>
      	<h2>Teachers</h2>
      	<ul>
      		{this.state.teachers.map(teacher =>
      			<div id={teacher.id}> {teacher.registrationId}. {teacher.name} {teacher.class} {teacher.designation} </div>		//all data not populated yet
      		)}
      	</ul>
      </div>
    );
  }
}

export default Teachers;
