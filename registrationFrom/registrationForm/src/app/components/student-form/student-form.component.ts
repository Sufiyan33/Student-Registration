import { Component } from '@angular/core';
import { StudentModel } from '../../model/Student';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../const/Constant';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent {

  studentObj: StudentModel = new StudentModel();
  studentList: StudentModel [] =[];

  isResultLoaded = false;
  isUpdatedFormActive = false;
  currentStudentId = "";

  constructor(private http:HttpClient){}

  // Fetching all student while calling backeng api...
  getAllStudent(){
    this.http.get(Constants.API_DETAILS.GET_API_ALL).subscribe((result:any) =>{
      this.isResultLoaded = true;
      console.log(result.data);
      this.studentList = result.data;
    })
  }
}
