import React from 'react';
class TeacherModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {  showModal: true,
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
                    TeacherDetailscol:'',

                    isActive: false,
                    teach: false,
                 }
  }

  toggle(teacherId) {
    console.log("inside modal");
      this.setState({
        teach: !this.state.teach,
        isActive: true,
      });

      if(teacherId > 0){
        var id =teacherId;
        fetch('http://localhost:8086/teacher?id='+id+'').then(res => res.json())
        .then(res2 => {
            console.log(res2[0]);
            res2 = res2[0];
            this.setState({

                registrationId: res2.registrationId,
                name: res2.name,
                address: res2.address,
                //dateofBirth: res2.dateofBirth,
                contactNumber: res2.contactNumber,
                s_class: res2.s_class,
                section: res2.section,
                parentName: res2.parentName,
                classTeacher: res2.classTeacher,
            })
        })
      }
      else{
        this.setState({
          registrationId: -1,
          name: '',
          address: '',
          dateofBirth: '',
          contactNumber: '',
          s_class: '',
          section: '',

          parentName: '',
          photo: '',
          classTeacher:'',
        })
      }
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
  CloseModal(){
    this.setState({
     isActive: false,
   });
  }
  renderModal() {
    console.log("the link " + this.props.url + " was clicked.")

    return (
      <div className="modal show">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Modal
              title</h5>

              <button onClick={()=>this.CloseModal()}>
              <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">


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


            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-
               dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save
              changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.isActive && this.renderModal()}
      </div>
    );
  }
}

export default TeacherModal;
