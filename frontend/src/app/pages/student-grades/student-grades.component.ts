import { Component } from '@angular/core';
import { StudentGradesService } from '../../service/student-grades.service';
import { StudentGrade } from '../../models/student-grade.model';

@Component({
  selector: 'app-student-grades',
  templateUrl: './student-grades.component.html',
  styleUrls: ['./student-grades.component.css']
})
export class StudentGradesComponent {
  studentId = '';
  studentGrade: StudentGrade | null = null;
  error: string | null = null;
  loading = false;

  constructor(private gradesService: StudentGradesService) {}

  fetchGrades() {
    this.error = null;
    this.studentGrade = null;
    this.loading = true;
    this.gradesService.getGradesByStudentId(this.studentId).subscribe({
      next: (data: StudentGrade | null) => {
        this.studentGrade = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'לא נמצאו נתונים עבור תלמיד זה';
        this.loading = false;
      }
    });
  }
}