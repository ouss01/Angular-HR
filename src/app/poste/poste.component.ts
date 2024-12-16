import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { EmployeeService } from 'app/services/employee.service'; // Assuming the service is in this path

@Component({
  selector: 'app-promotion',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTabsModule,
  ],
  templateUrl: './poste.component.html',
  styleUrls: ['./poste.component.scss'],
})
export class PosteComponent implements OnInit {
  title: string = ''; // Track the title field
  description: string = ''; // Track the description field
  assignedEmployee: string = ''; // Track assigned employee field
  housing: string = ''; // Track housing field
  employees: any[] = []; // Store fetched employee data

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees(); // Fetch employees when component initializes
  }

  // Fetch employee data from the API
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: any[]) => {
        // Extract the first and last names and create a full name for the select options
        this.employees = response.map((employee) => ({
          id: employee.employeeID,
          name: `${employee.firstName} ${employee.lastName}`
        }));
      },
      (error) => {
        console.error('Error fetching employees', error);
        Swal.fire('Error', 'There was an error fetching employee data', 'error');
      }
    );
  }

  // Method to handle form submission
  onSubmit() {
    // Validate required fields
    if (this.title.trim() === '' || !this.assignedEmployee) {  // Check if assignedEmployee has a valid value
      Swal.fire({
        title: 'Error',
        text: 'Please fill in all required fields.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } else {
      Swal.fire({
        title: 'Success',
        text: 'Your form has been submitted successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
  }

}
