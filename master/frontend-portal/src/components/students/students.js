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
			.then(res2 => {
				this.setState({students:res2})
				console.log(res2);
			})
			.catch(e=>console.log(e));
	}
	
  render() {
    return (
      <div>
      	<h2>Students</h2>
      	<ul>
      		{this.state.students.map(student =>
      			<li key={student.id} id={student.id}> 
				  {student.id}. {student.name} 
				  {student.class} {student.contactNumber}
				</li>		//all data not populated yet
      		)}
      	</ul>
      </div>
    );
  }
}

export default Students;
 