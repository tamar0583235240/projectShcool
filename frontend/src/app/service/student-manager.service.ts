import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student-manager.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
    private apiUrl = 'http://localhost:3000/api/students';

    constructor(private http: HttpClient) { }
    createStudent(studentData: any): Observable<any> {
        return this.http.post('http://localhost:3000/api/students', studentData);
    }

    getAllStudents(): Observable<Student[]> {
        return this.http.get<Student[]>(this.apiUrl);
    }
}