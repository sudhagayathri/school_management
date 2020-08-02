import React, {Component} from 'react';
import ReactDom from 'react-dom';

class AddTeacher extends Component
{
	state = {
			registrationId: -1,
			name: '',
			address: '',
			dateofBirth: '',
			contactNumber: '',
			designation: '',
			qualification: '',
			specialisedSubject: '',			
			classs: '',
			type: '',
			photo: '',
			TeacherDetailscol:''
	}
	onSubmit(e){
		e.preventDefault();

		let formData = new FormData();
		formData.append('registrationId', this.state.registrationId);
		formData.append('name', this.state.name);
		formData.append('address', this.state.address);
		formData.append('dateofBirth', this.state.dateofBirth);
		formData.append('contactNumber', this.state.contactNumber);
		formData.append('designation', this.state.designation);
		formData.append('qualification', this.state.qualification);
		formData.append('specialisedSubject', this.state.specialisedSubject);
		formData.append('class', this.state.classs);
		formData.append('type', this.state.type);
		formData.append('TeacherDetailscol', this.state.TeacherDetailscol);
		formData.append('photo', this.state.photo);
		
		console.log(this.state.photo);
		fetch("http://localhost:8086/teacher", {
			method: 'post',
			body: formData,
			  header: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/x-www-form-urlencoded',
			  }  
		})
		.then((response) => response.json)
				.then((response) => {
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
								<label>Name</label>
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
								<label>designation</label>
							</div>
							<div className="col-md-4 col-md-4 col-xs-4">
								<input type="text" 
								  value={this.state.designation} 
								  onChange={e=>this.setState({designation:e.target.value})}
								/>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-md-2 col-md-2 col-xs-2">
								<label>qualification</label>
							</div>
							<div className="col-md-4 col-md-4 col-xs-4">
								<input type="text" 
								  value={this.state.qualification} 
								  onChange={e=>this.setState({qualification:e.target.value})}
								/>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-md-2 col-md-2 col-xs-2">
								<label>specialisedSubject</label>
							</div>
							<div className="col-md-4 col-md-4 col-xs-4">
								<input type="text" 
								  value={this.state.specialisedSubject} 
								  onChange={e=>this.setState({specialisedSubject:e.target.value})}
								/>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-md-2 col-md-2 col-xs-2">
								<label>classs</label>
							</div>
							<div className="col-md-4 col-md-4 col-xs-4">
								<input type="text" 
								  value={this.state.classs} 
								  onChange={e=>this.setState({classs:e.target.value})}
								/>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-md-2 col-md-2 col-xs-2">
								<label>TeacherDetailscol</label>
							</div>
							<div className="col-md-4 col-md-4 col-xs-4">
								<input type="text" 
								  value={this.state.TeacherDetailscol} 
								  onChange={e=>this.setState({TeacherDetailscol:e.target.value})}
								/>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-md-2 col-md-2 col-xs-2">
								<label>type</label>
							</div>
							<div className="col-md-4 col-md-4 col-xs-4">
								<input type="number" 
								  value={this.state.type} 
								  onChange={e=>this.setState({type:e.target.value})}
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
					<button onClick = {e => this.onSubmit(e)}>Submit</button>
				</form>
		)
	}
}
export default AddTeacher;