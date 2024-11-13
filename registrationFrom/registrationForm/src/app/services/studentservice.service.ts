import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentModel } from '../model/Student';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentserviceService {
  private postApi = 'http://localhost:8085/api/student/add';
  private getApi = 'http://localhost:8085/api/student';
  private putApi = 'http://localhost:8085/api/student/update/:id';
  private deleteApi = 'http://localhost:8085/api/student/delete:id';

  constructor(private http: HttpClient) { }

  createStudent(student: StudentModel): Observable<StudentModel>{
    return this.http.post<StudentModel>(this.postApi, student);
  }

  getStudents(): Observable<StudentModel[]>{
    return this.http.get<{status: boolean, data: StudentModel[]}>(this.getApi)
    .pipe(map(response => response.data));
  }

  updateStudent(student: StudentModel): Observable<StudentModel>{
    return this.http.put<StudentModel>(`${this.putApi}/${student.id}`, student);
  }

  deleteStudent(id: number): Observable<void>{
    return this.http.delete<void>(`${this.deleteApi}/${id}`);
  }
}
