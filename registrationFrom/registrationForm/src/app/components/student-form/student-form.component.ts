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
  //Add an editMode flag to track whether the form is in "edit" mode or not.
  editMode: boolean = false;
  currentStudentId: number | null = null ; // To store the ID of the student being edited

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
    this.studentService.getStudents().subscribe(data => {
      console.log('Data coming from backend: ', data);
      this.studentList = data;
    },
    error =>{
      console.error('Error fetching students', error);
    }
  );
  }

  // Save or update data.
  saveStudents():void {
    const student: StudentModel = this.studentForm.value;
    if(this.editMode && this.currentStudentId){
      // update the student if editMode is true.
      this.studentService.updateStudent(this.currentStudentId, student).subscribe(() =>{
        this.loadStudednts(); // Reload the student list after updating
        this.studentForm.reset(); // Reset form.
        this.editMode = false;this.currentStudentId = null;
      },
      error => console.error('Error updating student:', error)
    );
    }else{
      //create new student if not editMode true.
      this.studentService.createStudent(student).subscribe(() =>{
        this.loadStudednts(); //Reload student after saving.
        this.studentForm.reset();
       },
       error => console.error('Error saving student:', error)
      );
    }
  }

  deleteStudent(id: number): void{
    this.studentService.deleteStudent(id).subscribe(() => this.loadStudednts());
  }

  onEdit(student: StudentModel): void{
    this.editMode =  true; // set editMode flag true.
    this.currentStudentId = student.id; // Store the ID of the student being edited
    // now populate select student in form.
    this.studentForm.patchValue({
      name: student.name,
      course: student.course,
      fees: student.fees
    });
  }
}
