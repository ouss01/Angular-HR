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
  selector: 'app-add-handicap',
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
  templateUrl: './add-handicap.component.html',
  styleUrls: ['./add-handicap.component.scss'],
})
export class AddHandicapComponent {
  readonly dialogRef = inject(MatDialogRef<AddHandicapComponent>);
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    // Define the form structure with proper naming conventions
    this.form = this.fb.group({
      employee: [''], // camelCase for variable name
      department: [''],
      handicapType: [''], // Adjusted to camelCase
      amenagementType: [''], // Adjusted to camelCase
      evaluationDate: [''], // Adjusted to camelCase
      amenagementState: [''], // Adjusted to camelCase
    });
  }

  // Function to handle form submission
  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log('Form Data:', formData); // Replace this with your service call to save the data
      this.dialogRef.close(formData); // Pass data back to the parent component
    } else {
      console.log('Form is invalid');
    }
  }

  // Function to close the dialog without sending data
  onNoClick(): void {
    this.dialogRef.close(); // Close without sending data back
  }
}
