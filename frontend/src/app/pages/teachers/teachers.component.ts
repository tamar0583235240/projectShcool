import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../../service/teachers.service';
import { Teacher } from '../../models/teachers.modle';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[] = [];
  loading = false;
  error: string | null = null;

  constructor(private teachersService: TeachersService) {}

  ngOnInit() {
    this.fetchTeachers();
  }

  fetchTeachers() {
    this.loading = true;
    this.teachersService.getAllTeachers().subscribe({
      next: (data) => {
        this.teachers = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'שגיאה בטעינת מורים';
        this.loading = false;
      }
    });
  }
}