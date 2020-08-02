import React, {Component} from 'react';
//import ReactDom from 'react-dom';

class AddStudent extends Component
{
	state = {
			registrationId: -1,
			name: '',
			address: '',
			dateofBirth: '',
			contactNumber: '',
			s_class: '',
			section: '',
			parentName: '',
			photo: '',
			classTeacher:''
	}
	onSubmit(e){
		e.preventDefault();

		let formData = new FormData();
		formData.append('registrationId', this.state.registrationId);
		formData.append('name', this.state.name);
		formData.append('address', this.state.address);
		formData.append('dateofBirth', this.state.dateofBirth);
		formData.append('contactNumber', this.state.contactNumber);
		formData.append('s_class', this.state.s_class);
		formData.append('section', this.state.section);
		formData.append('parentName', this.state.parentName);
		formData.append('photo', this.state.photo);
		formData.append('classTeacher', this.state.classTeacher);
		console.log(this.state.photo);
		fetch("http://localhost:8086/student", {
			method: 'post',
			body: formData,
			  header: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/x-www-form-urlencoded',
			  }  
		})
		.then(response => response.json())
		.then(response => {
			console.log(response);
		})
		.catch((error)=>{
			console.log(error);
		})	  
	}
	
	handleImage(e){
		console.log(this);
		this.setState({ 
			photo: e.target.files[0]
		});
	}
	render(){
		return (
				<form action="http://localhost:8086/student" method="POST">
					<div className="form-group">
						<div className="row">
							<div className="col-md-2 col-md-2 col-xs-2">
								<label>Student's Name</label>
							</div>
							<div className="col-md-4 col-md-4 col-xs-4">
								<input type="text" 
								  value={this.state.name} 
								  onChange={e=>this.setState({name:e.target.value})}
								/>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-md-2 col-md-2 col-xs-2">
								<label>Address</label>
							</div>
							<div className="col-md-4 col-md-4 col-xs-4">
								<input type="text" 
								  value={this.state.address} 
								  onChange={e=>this.setState({address:e.target.value})}
								/>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-md-2 col-md-2 col-xs-2">
								<label>DateofBirth</label>
							</div>
							<div className="col-md-4 col-md-4 col-xs-4">
								<input type="date" 
								  value={this.state.dateofBirth} 
								  onChange={e=>this.setState({dateofBirth:e.target.value})}
								/>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-md-2 col-md-2 col-xs-2">
								<label>S_Class</label>
							</div>
							<div className="col-md-4 col-md-4 col-xs-4">
								<input type="text" 
								  value={this.state.s_class} 
								  onChange={e=>this.setState({s_class:e.target.value})}
								/>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-md-2 col-md-2 col-xs-2">
								<label>contactNumber</label>
							</div>
							<div className="col-md-4 col-md-4 col-xs-4">
								<input type="number" 
								  value={this.state.contactNumber} 
								  onChange={e=>this.setState({contactNumber:e.target.value})}
								/>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-md-2 col-md-2 col-xs-2">
								<label>Class Teacher</label>
							</div>
							<div className="col-md-4 col-md-4 col-xs-4">
								<input type="text" 
								  value={this.state.classTeacher} 
								  onChange={e=>this.setState({classTeacher:e.target.value})}
								/>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-md-2 col-md-2 col-xs-2">
								<label>Section</label>
							</div>
							<div className="col-md-4 col-md-4 col-xs-4">
								<input type="text" 
								  value={this.state.section} 
								  onChange={e=>this.setState({section:e.target.value})}
								/>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-md-2 col-md-2 col-xs-2">
								<label>Parent Name</label>
							</div>
							<div className="col-md-4 col-md-4 col-xs-4">
								<input type="text" 
								  value={this.state.parentName} 
								  onChange={e=>this.setState({parentName:e.target.value})}
								/>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-md-2 col-md-2 col-xs-2">
								<label>Photo</label>
							</div>
							<div className="col-md-4 col-md-4 col-xs-4">
								<input type="file" accept="image/*"
								  
								  onChange={this.handleImage.bind(this)}
								/>
							</div>
						</div>
					</div>
					<button className="submit" onClick = {e => this.onSubmit(e)}>Submit</button>
				</form>
		)
	}
}
export default AddStudent;