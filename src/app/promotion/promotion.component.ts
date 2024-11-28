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
import { AddPromotionComponent } from './modal/add-promotion/add-promotion.component';
@Component({
  selector: 'app-promotion',
  standalone: true,
  imports: [CommonModule  , MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],

  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.scss'
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
    }
  ];

  readonly dialog = inject(MatDialog);

  openAddModal(){ 

     const dialogRef = this.dialog.open(AddPromotionComponent, {
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
