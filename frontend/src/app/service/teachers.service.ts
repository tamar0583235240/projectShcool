import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teachers.modle';

@Injectable({ providedIn: 'root' })
export class TeachersService {
  private apiUrl = 'http://localhost:3000/api/teachers';

  constructor(private http: HttpClient) {}

  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl);
  }
}