import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../service/student-manager.service';
import { Student } from '../../models/student-manager.model';

@Component({
  selector: 'app-student-manager',
  templateUrl: './student-manager.component.html',
  styleUrls: ['./student-manager.component.css']
})
export class StudentManagerComponent implements OnInit {
  mainTitle = 'Student Manager';
  students: Student[] = [];
  studentCount = 0;
  loading = false;
  error: string | null = null;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.fetchStudents();
  }

  fetchStudents() {
    this.loading = true;
    this.studentService.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.studentCount = data.length;
        this.loading = false;
      },
      error: () => {
        this.error = 'שגיאה בטעינת תלמידים';
        this.loading = false;
      }
    });
  }
}