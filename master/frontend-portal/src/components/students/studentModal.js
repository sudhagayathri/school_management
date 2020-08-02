import React from 'react';
import '../../resource/css/stdentmodal.css';
class StudentModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = { showModal: true,
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
                   isActive: false,
                   stud: false,
                   studentId: -1,
                 }
  }

  toggle(studentId) {

    console.log("inside modal");
      this.setState({
        stud: !this.state.stud,
        isActive: true,
        studentId: studentId,
      });

      if(studentId > 0){
        var id = studentId;
        fetch('http://localhost:8086/student?id='+id+'').then(res => res.json())
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

    if((this.state.contactNumber).length < 1)
    {
        alert("Contact number is manadatory!!");
        return false;
    }
    let formData = new FormData();
    formData.append('studentId', this.state.studentId);
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

    fetch('http://localhost:8086/student', {
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
      alert("Saved!!!");
      this.setState({
         isActive: false,
       });

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
      <div className="modal show modalEditor" id="studentModal">
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

            </form>


            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-
               dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick = {e => this.onSubmit(e)}>Save
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

export default StudentModal;
