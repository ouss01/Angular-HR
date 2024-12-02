import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { AddPromotionComponent } from './modal/add-promotion/add-promotion.component';

@Component({
  selector: 'app-promotion',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss'],
})
export class PromotionComponent {
  promotions = [
    {
      department: 'HR',
      promotedEmployee: 'John Doe',
      promotionDate: new Date(2024, 10, 25), // November 25, 2024
      promotionFrom: 'Junior Manager',
      promotionTo: 'Senior Manager',
    },
    {
      department: 'IT',
      promotedEmployee: 'Jane Smith',
      promotionDate: new Date(2024, 9, 15), // October 15, 2024
      promotionFrom: 'Developer',
      promotionTo: 'Team Lead',
    },
  ];

  readonly dialog = inject(MatDialog);

  // Method to handle adding a promotion
  openAddModal() {
    const dialogRef = this.dialog.open(AddPromotionComponent, {
      data: {},
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Confirmation alert before adding the promotion
        Swal.fire({
          title: 'Êtes-vous sûr ?',
          text: 'Voulez-vous ajouter cette promotion ?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui, ajouter!',
        }).then((response) => {
          if (response.isConfirmed) {
            // Add promotion and show success message
            this.promotions.push(result);
            Swal.fire('Ajoutée!', 'La promotion a été ajoutée avec succès.', 'success');
          }
        });
      } else {
        // Alert for closing without saving
        Swal.fire('Annulé', 'Aucun changement n\'a été effectué.', 'info');
      }
    });
  }

  // Method for Accepter button
  handleAccept(promotion: any) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Voulez-vous accepter la promotion pour ${promotion.promotedEmployee} ?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745', // Green for Accept
      cancelButtonColor: '#d33', // Red for Cancel
      confirmButtonText: 'Oui, accepter!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Acceptée!',
          `La promotion pour ${promotion.promotedEmployee} a été acceptée.`,
          'success'
        );
      }
    });
  }

  // Method for Refuser button
  handleRefuse(promotion: any) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Voulez-vous refuser la promotion pour ${promotion.promotedEmployee} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33', // Red for Refuse
      cancelButtonColor: '#6c757d', // Gray for Cancel
      confirmButtonText: 'Oui, refuser!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Refusée!',
          `La promotion pour ${promotion.promotedEmployee} a été refusée.`,
          'info'
        );
      }
    });
  }
}
