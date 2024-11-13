import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../../model/Student';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../const/Constant';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StudentserviceService } from '../../services/studentservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit{

  studentObj: StudentModel = new StudentModel();
  studentList: StudentModel [] =[];

  studentForm: FormGroup;

  isResultLoaded = false;
  isUpdatedFormActive = false;
  currentStudentId = "";

  constructor(private fb:FormBuilder, private studentService: StudentserviceService){
    this.studentForm = this.fb.group({
      name: [''],
      course: [''],
      fees: ['']
    });
  }

  ngOnInit(): void {
    this.loadStudednts();
  }

  loadStudednts(): void{
    this.studentService.getStudents().subscribe(data => this.studentList = data);
  }

  saveStudents():void {
     this.studentObj = this.studentForm.value;
     this.studentService.createStudent(this.studentObj).subscribe(() =>{
      this.loadStudednts(); //Reload student after saving.
      this.studentForm.reset();
     });
  }

  deleteStudent(id: number): void{
    this.studentService.deleteStudent(id).subscribe(() => this.loadStudednts());
  }
}
