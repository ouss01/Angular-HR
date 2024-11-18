import { Component, OnInit, Input, ViewChild, ElementRef, ViewEncapsulation, ChangeDetectionStrategy, inject } from "@angular/core";
import { OrgChart } from "d3-org-chart";
import {MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';

import { EmployeeService } from "app/services/employee.service";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-d3-org-chart",
  templateUrl: "./d3-org-chart.component.html",
  styleUrls: ["./d3-org-chart.component.scss"],
   standalone: true,
   imports:[MatDialogModule , CommonModule]
})
export class D3OrgChartComponent implements OnInit {
  @ViewChild("chartContainer") chartContainer: ElementRef;
  @Input() data: any[];
  chart: OrgChart;
  readonly dialog = inject(MatDialog);

  constructor(private equipeService: EmployeeService) {}

  ngOnInit() {
    this.fetchData();
  }
  openDialog(Data : any) {
    this.dialog.open(DialogAnimationsExampleDialog, {
      data:Data

    });
  }
  fetchData() {
    this.equipeService.getEmployees().subscribe(
      (data: any[]) => {
        // Transform data if necessary
        this.data = data.map(employee => ({
          id: employee.id,
          name: `${employee.firstName} ${employee.lastName}`,
          position: employee.position,
          image: employee.photo ? employee.photo.replace('/media', '/api/media') : null,  // Update image URL if it exists
          parentId: employee.parentId  // Assuming parentId is stored in the employee data
        }));
  
        // Check for multiple roots
        const rootCount = this.data.filter(emp => emp.parentId === null).length;
        if (rootCount !== 1) {
          console.error("Error: The data has multiple root nodes or no root node.", this.data);
        } else {
          this.updateChart();
        }
      },
      error => {
        console.error("Error fetching employee data:", error);
      }
    );
  }
  
  ngAfterViewInit() {
    this.chart = new OrgChart();
    this.updateChart();
  }
 

  click(){
    console.log("clicked");
    
  }
  updateChart() {
    if (!this.data) {
      console.log('Data is empty');
      return;
    }
    if (!this.chart || !this.chartContainer || !this.chartContainer.nativeElement) {
      console.log('Chart or chart container is not initialized');
      return;
    }
    this.chart
      .container(this.chartContainer.nativeElement)
      .data(this.data)
      .nodeContent((node) => { 
        const color = '#FFFFFF';
        const imageDiffVert = 25 + 2;
        return `
          <div  style='width:${node.width}px;height:${node.height}px;padding-top:${imageDiffVert - 2}px;padding-left:1px;padding-right:1px'>
            <div style="font-family: 'Inter', sans-serif;background-color:${color};margin-left:-1px;width:${node.width - 2}px;height:${node.height - imageDiffVert}px;border-radius:10px;border: ${node.data._highlighted || node.data._upToTheRootHighlighted ? '5px solid #E27396"' : '1px solid #E4E2E9"'}">
              <div style="display:flex;justify-content:flex-end;margin-top:5px;margin-right:8px">#${node.data.id}</div>
              <div style="background-color:${color};margin-top:${-imageDiffVert - 20}px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;"></div>
              <div   (click)="click()"  style="margin-top:${-imageDiffVert - 20}px;"><img src="${node.data.image}" style="margin-left:${20}px;border-radius:100px;width:40px;height:40px;" /></div>
              <div style="font-size:15px;color:#08011E;margin-left:20px;margin-top:10px">${node.data.name}</div>
              <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;">${node.data.position}</div>
            </div>
          </div>`;
      })
      .onNodeClick((d) =>{ 
        this.openDialog(d.data) 

       }  )
       .render();
  }
}


@Component({
  selector: 'dialog-animations-example-dialog',
  template: `
    <mat-dialog-content>
      <mat-card>
        <mat-card-header>
          <div mat-card-avatar class="example-header-image">
            <img [src]="data.image" alt="{{data.name}}" />
          </div>
          <mat-card-title>{{ data.name }}</mat-card-title>
          <mat-card-subtitle>{{ data.position }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p><strong>ID:</strong> {{ data.id }}</p>
          <p><strong>Position:</strong> {{ data.position }}</p>
          <p><strong>Parent ID:</strong> {{ data.parentId }}</p>
          <p><strong>Total Subordinates:</strong> {{ data._totalSubordinates }}</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button mat-dialog-close>Close</button>
        </mat-card-actions>
      </mat-card>
    </mat-dialog-content>
  `,
  styles: [`
    mat-card {
      max-width: 400px;
    }
    .example-header-image img {
      border-radius: 50%;
      width: 50px;
      height: 50px;
    }
  `],
  standalone: true,
  imports: [
    MatButtonModule, 
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatCardModule,
    MatDialogContent,
    
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnimationsExampleDialog implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  ngOnInit(): void {
    console.log("Data from modal:", this.data);
  }
}
