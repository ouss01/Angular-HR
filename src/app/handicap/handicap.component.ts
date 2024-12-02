import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';  // Import SweetAlert2
import { AddHandicapComponent } from './modal/add-handicap/add-handicap.component';

@Component({
  selector: 'app-handicap',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  templateUrl: './handicap.component.html',
  styleUrls: ['./handicap.component.scss'],
})
export class HandicapComponent {
  feedback = {
    suggestion: '',
    rating: 3,
    additionalComments: ''
  };

  // Sample employees data
  employees = [
    {
      department: 'Finance',
      Employee: 'Oussema Trimech',
      handicapType: 'Auditif',
      amenagementType: 'Système d’assistance audio',
      amenagementState: 'Actif',
      evaluationDate: new Date(2024, 8, 20), // Sep 20, 2024
    },
    {
      department: 'Engineering',
      Employee: 'Yassin TR',
      handicapType: 'Trouble de la vue',
      amenagementType: 'Écran adapté',
      amenagementState: 'Actif',
      evaluationDate: new Date(2024, 11, 10), // Dec 10, 2024
    },
    {
      department: 'Marketing',
      Employee: 'Firas SK',
      handicapType: 'Mobilité réduite',
      amenagementType: 'Accès facilité',
      amenagementState: 'Inactif',
      evaluationDate: new Date(2024, 6, 5), // Jul 5, 2024
    },
    {
      department: 'Sales',
      Employee: 'Amine TR',
      handicapType: 'Auditif',
      amenagementType: 'Casque audio adapté',
      amenagementState: 'Actif',
      evaluationDate: new Date(2024, 5, 25), // Jun 25, 2024
    },
  ];

  usedBudget = 18520; // Budget used
  totalBudget = 25200; // Total budget

  // Form definition
  form: FormGroup;

  readonly dialog = inject(MatDialog);

  constructor(private fb: FormBuilder) {
    // Initialize the form
    this.form = this.fb.group({
      suggestion: ['', Validators.required],
      rating: [3, Validators.required],
      additionalComments: [''],
    });
  }

  // Open the modal to add an accommodation
  openAddModal(): void {
    const dialogRef = this.dialog.open(AddHandicapComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.employees.push(result);
        console.log('New accommodation added:', result);

        // Show SweetAlert2 success message for adding the accommodation
        Swal.fire({
          title: 'Success!',
          text: 'The accommodation has been successfully added.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {
        console.log('Dialog closed without adding');
      }
    });
  }

  // Accepter Button with SweetAlert2
  acceptAccommodation(item: any): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Vous allez accepter l'accommodation de ${item.Employee}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, accepter!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Accepté!',
          `L'accommodation de ${item.Employee} a été acceptée.`,
          'success'
        );
        // Update accommodation state
        item.amenagementState = 'Actif'; 
      }
    });
  }

  // Refuser Button with SweetAlert2
  rejectAccommodation(item: any): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Vous allez refuser l'accommodation de ${item.Employee}.`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, refuser!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Refusé!',
          `L'accommodation de ${item.Employee} a été refusée.`,
          'error'
        );
        // Update accommodation state
        item.amenagementState = 'Inactif'; 
      }
    });
  }

  // Function to remove accommodation
  removeAccommodation(item: any): void {
    const index = this.employees.indexOf(item);
    if (index > -1) {
      this.employees.splice(index, 1);
      console.log('Accommodation removed:', item.Employee);
    }
  }

  // Handle form submission
  submitFeedback(): void {
    if (this.feedback.suggestion.trim() && this.feedback.rating) {
      const formData = this.feedback;
      console.log('Form Data:', formData); // Handle the data as needed

      // Show success alert with SweetAlert2
      Swal.fire({
        title: 'Success!',
        text: 'Your suggestions have been submitted.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      // Optionally, clear the form after submission
      this.feedback.suggestion = '';
      this.feedback.rating = 3;
      this.feedback.additionalComments = '';
    } else {
      // Show an error alert if the form is invalid
      Swal.fire({
        title: 'Error!',
        text: 'Please fill out all required fields.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
}
