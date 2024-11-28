import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
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
import { AddFinActivityComponent } from './modal/add-fin-activity/add-fin-activity.component';
@Component({
  selector: 'app-fin-activity',
  standalone: true,
  imports: [CommonModule  , MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],

  templateUrl: './fin-activity.component.html',
  styleUrl: './fin-activity.component.scss'
})
export class FinActivityComponent {
  promotions = [
    {
      department: 'HR',
      Employee: 'John Doe',
      DateFin: new Date(2024, 10, 25), // November 25, 2024
      TypeContrat: 'CDI',
      RaisonFin: 'Retraite',
    },
    {
      department: 'IT',
      Employee: 'Ouss Smith',
      DateFin: new Date(2024, 9, 15), // October 15, 2024
      TypeContrat: 'CDD',
      RaisonFin: 'Fin Contrat',
    }
  ];

  readonly dialog = inject(MatDialog);

  openAddModal(){ 

     const dialogRef = this.dialog.open(AddFinActivityComponent, {
      data: {},
      width:'500px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
         this.promotions.push(result)
        console.log('Received Data:', result);
        // Perform your service call to save the data
      } else {
        console.log('Dialog was closed without saving');
      }
    });
  }

}
