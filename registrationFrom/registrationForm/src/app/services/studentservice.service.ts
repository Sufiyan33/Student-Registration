import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentModel } from '../model/Student';
import { map, Observable } from 'rxjs';
import { Constants } from '../const/Constant';

@Injectable({
  providedIn: 'root'
})
export class StudentserviceService {
  constructor(private http: HttpClient) { }

  createStudent(student: StudentModel): Observable<StudentModel>{
    return this.http.post<StudentModel>(Constants.API_DETAILS.API_URL, student);
  }

  getStudents(): Observable<StudentModel[]>{
    return this.http.get<{status: boolean, data: StudentModel[]}>(Constants.API_DETAILS.API_URL)
    .pipe(map(response => response.data));
  }

  updateStudent(id: number, student: StudentModel): Observable<any>{
    return this.http.put(`${Constants.API_DETAILS.API_URL}/${id}`, student);
  }

  deleteStudent(id: number): Observable<void>{
    return this.http.delete<void>(`${Constants.API_DETAILS.API_URL}/${id}`);
  }
}
