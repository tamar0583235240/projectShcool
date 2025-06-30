import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  loginStudent(id: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/student/login`, { id, password });
  }

  loginTeacher(id: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/teacher/login`, { id, password });
  }
}