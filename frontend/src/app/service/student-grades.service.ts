import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentGrade } from '../models/student-grade.model';

@Injectable({
  providedIn: 'root'
})
export class StudentGradesService {
  private apiUrl = 'http://localhost:3000/api/grades';

  constructor(private http: HttpClient) {}

  // קבלת כל הציונים של תלמיד מסוים
  getGradesByStudentId(studentId: string): Observable<StudentGrade> {
    return this.http.get<StudentGrade>(`${this.apiUrl}/report/${studentId}`);
  }
}