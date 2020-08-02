import React, {Component} from 'react';
import ReactDom from 'react-dom';

class Teachers extends Component
{
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
	
	render(){
		return (
				<div>
					<h2>Teachers</h2>
					<ul>
						{this.state.teachers.map(teacher =>
						<li key={teacher.id} id={teacher.id}> {teacher.id}. {teacher.name} {teacher.class} {teacher.contactNumber}</li>
						)}
					</ul>
				</div>
		)
	}
}
export default Teachers;