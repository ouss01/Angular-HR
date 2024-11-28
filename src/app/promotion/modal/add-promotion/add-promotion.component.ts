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
  selector: 'app-add-promotion',
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
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.scss'],
})
export class AddPromotionComponent {
  readonly dialogRef = inject(MatDialogRef<AddPromotionComponent>);
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      promotedEmployee: ['', Validators.required],
      department: ['', Validators.required],
      promotionFrom: ['', Validators.required],
      promotionTo: ['', Validators.required],
      promotionDate: ['', Validators.required],
    });
  }

  onSubmit(): void {
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
