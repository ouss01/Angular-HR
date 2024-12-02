import { CommonModule, DecimalPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { EmployeeService } from 'app/services/employee.service';
import Swal from 'sweetalert2';

@Component({
    selector       : 'analytics',
    templateUrl    : './analytics.component.html',
    standalone     : true,
    imports        : [
        MatButtonModule, 
        CommonModule, 
        MatIconModule, 
        MatMenuModule, 
        MatButtonToggleModule, 
        MatTooltipModule, 
        NgFor, 
        DecimalPipe
    ],
})
export class AnalyticsComponent implements OnInit {
    employees: any[] = [];
    selectedEmployees: any[] = [];

    constructor(
        private employeeservice: EmployeeService,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.getEmployee();
    }

    // Fetch employee data from the service
    getEmployee(): void {
        this.employeeservice.getEmployees().subscribe((response: any) => {
            this.employees = response;
            console.log(this.employees);
        });
    }

    // Change the employee's status
    handleStatusChange(event: any, employee: any) {
        const selectedStatus = event.target.value;
        Swal.fire({
            title: 'Change Employee Status',
            text: `Are you sure you want to mark ${employee.firstName} ${employee.lastName} as ${selectedStatus}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                // Logic to update the status (example: calling an API to update)
                Swal.fire(
                    'Status Updated!',
                    `${employee.firstName} ${employee.lastName} has been marked as ${selectedStatus}.`,
                    'success'
                );
            } else {
                // If canceled, revert the status selection (if needed)
                event.target.value = ''; 
            }
        });
    }


    deleteSelectedEmployees() {
        if (this.selectedEmployees.length > 0) {
          Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete ${this.selectedEmployees.length} employee(s).`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete them',
            cancelButtonText: 'No, cancel'
          }).then((result) => {
            if (result.isConfirmed) {
              const deletePromises = this.selectedEmployees.map(employee => 
                this.employeeservice.deleteEmployee(employee.id).toPromise()  // API call to delete employee
              );
      
              // Wait for all deletions to finish
              Promise.all(deletePromises)
                .then(() => {
                  // Remove the deleted employees from the list
                  this.employees = this.employees.filter(emp => !this.selectedEmployees.includes(emp));
                  Swal.fire('Deleted!', 'The selected employees have been deleted.', 'success');
                  this.selectedEmployees = [];  // Clear the selected employees array
                  this.router.navigate(['/dashboards/employees']);  // Redirect after deletion
                })
                .catch((error) => {
                  Swal.fire('Error!', 'An error occurred while deleting employees.', 'error');
                });
            }
          });
        } else {
          Swal.fire('No selection', 'Please select at least one employee to delete.', 'info');
        }
      }
      

    onEmployeeSelect(event: any, employee: any) {
        if (event.target.checked) {
          this.selectedEmployees.push(employee);  // Add employee to selected array
        } else {
          this.selectedEmployees = this.selectedEmployees.filter(emp => emp !== employee);  // Remove employee from selected array
        }
        console.log(this.selectedEmployees);  // For debugging purposes
      }

    // Select or deselect all employees
    selectAllEmployees(event: any) {
        if (event.target.checked) {
            // Select all employees
            this.selectedEmployees = [...this.employees]; // Add all employees to the selection
        } else {
            // Deselect all employees
            this.selectedEmployees = []; // Clear the selection
        }
    }

    // Navigate to the employee management page
    navigateToEmployeeManagement() {
        this.router.navigate(['/dashboards/employeesManagement']);
    }
}
