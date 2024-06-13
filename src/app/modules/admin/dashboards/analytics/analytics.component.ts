import { CommonModule, DecimalPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { AnalyticsService } from 'app/modules/admin/dashboards/analytics/analytics.service';
import { EmployeeService } from 'app/services/employee.service';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
// Remove the unused import
// import { Employee } from './Employee';

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
        NgApexchartsModule, 
        MatTooltipModule, 
        NgFor, 
        DecimalPipe
    ],
})
export class AnalyticsComponent implements OnInit {
    data: any;
    employees: any[] = [];

    /**
     * Constructor
     */
    constructor(private employeeservice: EmployeeService) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.getEmployee();
    }

    getEmployee(): void {
        this.employeeservice.getEmployees().subscribe((response: any) => {
            this.employees = response;
            console.log(this.employees);
        });
    }
}
