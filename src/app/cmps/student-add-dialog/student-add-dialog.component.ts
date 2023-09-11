import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Student } from 'src/app/models/students.model';  // Make sure the path is correct

@Component({
  selector: 'student-add-dialog',
  templateUrl: './student-add-dialog.component.html',
  styleUrls: ['./student-add-dialog.component.scss']
})
export class StudentAddDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StudentAddDialogComponent>
  ) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      grade: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateJoined: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      subject: ['', Validators.required]
    });
  }

  save() {
    if (this.form.valid) {
      console.log('form is valid');
      this.dialogRef.close(this.form.value as Student);
    } else {
      console.log('form is invalid');
    }
  }

  close() {
    this.dialogRef.close();
  }
}
