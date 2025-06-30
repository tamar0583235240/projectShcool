
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  loginAsTeacher() {
    this.router.navigate(['/login'], { queryParams: { role: 'teacher' } });
  }

  loginAsStudent() {
    this.router.navigate(['/login'], { queryParams: { role: 'student' } });
  }
}