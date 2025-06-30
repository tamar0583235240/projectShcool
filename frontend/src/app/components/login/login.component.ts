import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  id = '';
  password = '';
  error: string | null = null;
  role: 'student' | 'teacher' = 'student';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['role']) this.role = params['role'];
    });
  }

  login() {
    this.error = null;
    const loginFn = this.role === 'teacher'
      ? this.auth.loginTeacher(this.id, this.password)
      : this.auth.loginStudent(this.id, this.password);

    loginFn.subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.error = 'פרטי התחברות שגויים'
    });
  }
}