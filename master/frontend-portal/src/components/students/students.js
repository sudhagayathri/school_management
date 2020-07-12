import React, { Component } from 'react';
//import logo from './logo.svg';
import './students.css';

class Students extends Component {
	constructor(){
		super();
		this.state = {
			students:[]
		}
	}
	componentDidMount(){
		fetch('/student')
			.then(res => res.json())
			.then(studentsdata => this.setState({students:studentsdata}));
	}
	
  render() {
    return (
      <div>
      	<h2>Students</h2>
      	<ul>
      		{this.state.students.map(student =>
      			<div id={student.id}> {student.registrationId}. {student.name} {student.class} {student.contactNumber}</div>		//all data not populated yet
      		)}
      	</ul>
      </div>
    );
  }
}

export default Students;
