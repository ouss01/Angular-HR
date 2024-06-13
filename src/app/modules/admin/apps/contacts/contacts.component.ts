import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmployeeService } from 'app/services/employee.service';

@Component({
    selector: 'contacts',
    templateUrl: './contacts.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule]
})
export class ContactsComponent implements OnInit {
    employees = [];

    constructor(private employeeService: EmployeeService) {}

    ngOnInit(): void {
        this.getEmployees();
    }

    getEmployees(): void {
        this.employeeService.getEmployees().subscribe((response: any) => {
            console.log('Response from API:', response); // Log API response
            this.employees = response;
            console.log('Employees array:', this.employees); // Log employees array
        });
    }
}
