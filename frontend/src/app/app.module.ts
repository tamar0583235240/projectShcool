import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { DetailsComponent } from './pages/details/details.component';

import { StudentManagerComponent } from './pages/student-manager/student-manager.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentGradesComponent } from './pages/student-grades/student-grades.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentManagerComponent,
    TeachersComponent,
    DetailsComponent,
    StudentListComponent,
    StudentGradesComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
