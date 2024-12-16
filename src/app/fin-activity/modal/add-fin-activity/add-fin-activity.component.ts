import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-fin-activity',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  templateUrl: './add-fin-activity.component.html',
  styleUrls: ['./add-fin-activity.component.scss'],
})
export class AddFinActivityComponent {
  readonly dialogRef = inject(MatDialogRef<AddFinActivityComponent>);
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      Employee: ['', Validators.required],
      department: ['', Validators.required],
      TypeContrat: ['', Validators.required],
      RaisonFin: ['', Validators.required],
      DateFin: ['', Validators.required],
    });
  }

  onSubmit():void {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log('Form Data:', formData); // Replace this with your service call to save the data
      this.dialogRef.close(formData); // Pass data back to the parent component
    } else {
      console.log('Form is invalid');
    }
  }

  onNoClick(): void {
    this.dialogRef.close(); // Simply close without sending data
  }
}
