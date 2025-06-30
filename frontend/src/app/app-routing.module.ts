import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { DetailsComponent } from './pages/details/details.component';
import { StudentManagerComponent } from './pages/student-manager/student-manager.component';
import { StudentGradesComponent } from './pages/student-grades/student-grades.component';

import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent }, 
  { path: 'students', component: StudentManagerComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'grades', component: StudentGradesComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
