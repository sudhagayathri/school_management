const db = require('../../config/db_config.js');

class Student
{
  id                = -1;
  registrationId    = -1;
	name              = "";
	address           = "";
  dateofBirth       = "";
	contactNumber     = 0;
	s_class           = "";
	section           = "";
	parentName        = "";
	photo             = "backend-portal/uploads/cookie.png";
	classTeacher      = "";

  constructor(){
    console.log("student entity");
  }
  getId(){
    return this.id;
  }
  setId(id){
    this.id = id;
  }
  getRegistrationId(){
    return this.registrationId;
  }
  setRegistrationId(registrationId){
    this.registrationId = registrationId;
  }
  getName(){
    return this.name;
  }
  setName(name){
    this.name = name;
  }
  getAddress(){
    return this.address;
  }
  setAddress(address){
    this.address = address;
  }
  getContactNumber(){
    return this.contactNumber;
  }
  setContactNumber(contactNumber){
    this.contactNumber = contactNumber;
  }
  getStudentClass(){
    return this.s_class;
  }
  setStudentClass(s_class){
    this.s_class = s_class;
  }
  getSection(){
    return this.section;
  }
  SetSection(section){
    this.section = section;
  }
  getParentName(){
    return this.parentName;
  }
  SetParentName(parentName){
    this.parentName = parentName;
  }
  getPhoto(){
    return this.photo;
  }
  SetPhoto(photo){
    this.photo = photo;
  }
  getClassTeacher(){
    return this.classTeacher;
  }
  SetClassTeacher(classTeacher){
    this.classTeacher = classTeacher;
  }
}

module.exports =  Student;
