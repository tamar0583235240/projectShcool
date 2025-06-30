import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  @Input() title: string = '';
  @Input() students: any[] = [];

  @Output() studentCount = new EventEmitter<number>();

  ngOnInit() {
    this.studentCount.emit(this.students.length);
  }
}
