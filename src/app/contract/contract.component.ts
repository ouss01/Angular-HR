import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTabsModule,
  ],
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent {
  contractTitle: string = '';
  contractType: string = '';
  description: string = '';
  duration: number = 0;
  startDate: Date | null = null;

  constructor() {}

  // Method to handle form submission
  onSubmit() {
    Swal.fire({
      title: 'Success',
      text: 'Your form has been submitted successfully!',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }
}

