import React from 'react';
import '../resource/css/admin.css'
import  StudentModal from './students/studentModal';
import  TeacherModal from './teachers/teacherModal';
import axios from 'axios';
class Admin  extends React.Component{
  state={
       studentLists: [],
       teacherLists: [],
       showStudentModal: false,
       studentId: -1,
       showTeacherModal: false
   }
    fetchStudentLists(){
      fetch('http://localhost:8086/student',{withCredentials: true}).then(res => res.json())
        .then(res2 => {
            console.log(res2)
            this.setState({
                studentLists: res2
            })
        })
    }
    fetchTeacherLists(){
      fetch('http://localhost:8086/teacher',{withCredentials: true}).then(res => res.json())
        .then(res2 => {
            console.log(res2)
            this.setState({
                teacherLists: res2
            })
        })
    }
    sEdit(studentId){
      //let studentId =
      console.log(studentId);
      this.stud.toggle(studentId);
    }
    tEdit(teacherId){
      this.teach.toggle( teacherId);
    }
    addStudent(){
      this.stud.toggle(-1);
    }

    addTeacher(){
      this.teach.toggle(-1);
    }
    logout(){
    	 axios.get('http://localhost:8086/logout',{withCredentials: true})
         .then(res => {
        	 this.props.history.push("/login");
         })
         .catch(err => {
           console.log(err);
         });
    }
    render(){
      const sList = this.state.studentLists.map(item=>{
            return <li className="list-group-item"
                        key={item.id}
                        onClick={(e)=>this.sEdit(item.id)}>
                        {item.name}
                    </li>
        })
        const tList = this.state.teacherLists.map(item=>{
              return <li className="list-group-item"
                          key={item.id}
                          onClick={(e)=>this.tEdit(item.id)}>
                          {item.name}
                      </li>
          })
        return (
            <div>
                <div >
                    <div className="col-xs-3">
                        <ul className="nav nav-tabs tabs-left sideways">
                            <li className="" onClick={()=>this.fetchStudentLists()}>
                                <a href="#home-v" data-toggle="tab">List of Stsudents</a>
                            </li>
                            <li onClick={()=>this.fetchTeacherLists()}>
                              <a href="#messages-v" data-toggle="tab">List of Teachers</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-xs-9">
                        <div className="tab-content">
                            <div className="tab-pane" id="home-v">
                              <button type="button" className="btn btn-primary"
                                onClick={()=>this.addStudent()}>Add Student</button>
                              {sList}
                            </div>
                            <div className="tab-pane" id="messages-v">
                                <button type="button" className="btn btn-primary"
                                onClick={()=>this.addTeacher()}>Add Teacher</button>
                              {tList}
                            </div>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div>
                	<button type="button" className="btn btn-primary btn-right"
                    onClick={()=>this.logout()}>Logout</button>
                </div>
                <StudentModal
                    studentId={this.state.studentId}
                    ref={stud => this.stud = stud}
                />
                <TeacherModal
                    teacherId={this.state.teacherId}
                    ref={teach => this.teach = teach}
                />
            </div>
        )
    }
}

export default Admin;
