import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AddFinActivityComponent } from './modal/add-fin-activity/add-fin-activity.component';
import Swal from 'sweetalert2';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-fin-activity',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './fin-activity.component.html',
  styleUrls: ['./fin-activity.component.scss'],
 
})
export class FinActivityComponent {
  finactivity = [
    {
      department: 'HR',
      Employee: 'Amine TR',
      DateFin: new Date(2024, 10, 25), // November 25, 2024
      TypeContrat: 'CDI',
      RaisonFin: 'Retraite',
    },
    {
      department: 'IT',
      Employee: 'Oussema sakly',
      DateFin: new Date(2024, 9, 15), // October 15, 2024
      TypeContrat: 'CDD',
      RaisonFin: 'Fin Contrat',
    }
  ];

  readonly dialog = inject(MatDialog);

  // Open Add Modal to create a new Fin Activity
  openAddModal(): void {
    const dialogRef = this.dialog.open(AddFinActivityComponent, {
      width: '500px',
    });

    // After the dialog closes, handle the result (if any)
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Confirmation alert before adding the promotion
        Swal.fire({
          title: 'Êtes-vous sûr ?',
          text: 'Voulez-vous ajouter cette fin d activité ?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui, ajouter!',
        }).then((response) => {
          if (response.isConfirmed) {
            // Add promotion and show success message
            this.finactivity.push(result);
            Swal.fire('Ajoutée!', 'La Fin d Activité a été ajoutée avec succès.', 'success');
          }
        });
      } else {
        // Alert for closing without saving
        Swal.fire('Annulé', 'Aucun changement n\'a été effectué.', 'info');
      }
    });
  }

  handleAccept(finactivity: any) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Voulez-vous accepter la fin activité pour ${finactivity.Employee} ?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745', // Green for Accept
      cancelButtonColor: '#d33', // Red for Cancel
      confirmButtonText: 'Oui, accepter!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Acceptée!',
          `La fin d\'activité pour ${finactivity.Employee} a été acceptée.`,
          'success'
        );
      }
    });
  }

  handleRefuse(finactivity: any) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Voulez-vous refuser la Fin d\'Activité pour ${finactivity.Employee} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33', // Red for Refuse
      cancelButtonColor: '#6c757d', // Gray for Cancel
      confirmButtonText: 'Oui, refuser!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Refusée!',
          `La fin d\'activité pour ${finactivity.Employee} a été refusée.`,
          'info'
        );
      }
    });
  }
}
