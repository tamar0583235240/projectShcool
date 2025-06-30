import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../service/student-manager.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  detailsForm!: FormGroup;
  submitted = false;
  successMessage = '';

  constructor(private fb: FormBuilder, private studentsService: StudentService) { }

  ngOnInit(): void {
    this.detailsForm = this.fb.group({
      firstName: ['', Validators.required],
      phone: ['', [
        Validators.required,
        // Validators.pattern(/^05\d-\d{7}$/)
      ]],
      idNumber: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      city: ['', Validators.required],
      street: ['', Validators.required],
      houseNumber: ['', Validators.required],
      apartmentNumber: [''],
      age: ['', [Validators.required, Validators.min(0)]],
      class: ['', Validators.required],
      elementarySchool: [''],
      password: ['', Validators.required] // הוספת שדה סיסמה
    });

    this.detailsForm.get('age')?.valueChanges.subscribe(age => {
      const elemCtrl = this.detailsForm.get('elementarySchool');
      if (age > 14) {
        elemCtrl?.setValidators([Validators.required]);
      } else {
        elemCtrl?.clearValidators();
        elemCtrl?.setValue('');
      }
      elemCtrl?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.detailsForm.valid) {
      // בניית אובייקט לפי מבנה ה-API
      const form = this.detailsForm.value;
      const student = {
        id: form.idNumber,
        name: form.firstName,
        age: form.age,
        phone: form.phone,
        grade: form.class,
        address: {
          city: form.city,
          street: form.street,
          building: form.houseNumber,
          apartment: form.apartmentNumber
        },
        password: form.password // שליחת הסיסמה ל-API
      };
      this.studentsService.createStudent(student).subscribe({
        next: () => {
          this.successMessage = 'הפרטים נקלטו בהצלחה במערכת';
          this.detailsForm.reset();
          this.submitted = false;
        },
        error: () => {
          this.successMessage = 'אירעה שגיאה בשליחת הנתונים';
        }
      });
    } else {
      this.successMessage = '';
    }
  }
}