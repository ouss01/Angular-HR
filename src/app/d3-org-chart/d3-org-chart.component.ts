import { Component, OnInit, Input, ViewChild, ElementRef, ViewEncapsulation } from "@angular/core";
import { OrgChart } from "d3-org-chart";

import { EmployeeService } from "app/services/employee.service";

@Component({
  selector: "app-d3-org-chart",
  templateUrl: "./d3-org-chart.component.html",
  styleUrls: ["./d3-org-chart.component.scss"],
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class D3OrgChartComponent implements OnInit {
  @ViewChild("chartContainer", { static: true }) chartContainer: ElementRef;
  @Input() data: any[];
  chart: OrgChart;

  constructor(private equipeService: EmployeeService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.equipeService.getEmployees().subscribe(
      (data: any[]) => {
        // Transform data if necessary
        this.data = data.map(employee => ({
          id: employee.id,
          name: `${employee.firstName} ${employee.lastName}`,
          position: employee.position,
          image: employee.photo,  // Assuming the image URL is stored in the photo field
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
          <div style='width:${node.width}px;height:${node.height}px;padding-top:${imageDiffVert - 2}px;padding-left:1px;padding-right:1px'>
            <div style="font-family: 'Inter', sans-serif;background-color:${color};margin-left:-1px;width:${node.width - 2}px;height:${node.height - imageDiffVert}px;border-radius:10px;border: ${node.data._highlighted || node.data._upToTheRootHighlighted ? '5px solid #E27396"' : '1px solid #E4E2E9"'}">
              <div style="display:flex;justify-content:flex-end;margin-top:5px;margin-right:8px">#${node.data.id}</div>
              <div style="background-color:${color};margin-top:${-imageDiffVert - 20}px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;"></div>
              <div style="margin-top:${-imageDiffVert - 20}px;"><img src="${node.data.image}" style="margin-left:${20}px;border-radius:100px;width:40px;height:40px;" /></div>
              <div style="font-size:15px;color:#08011E;margin-left:20px;margin-top:10px">${node.data.name}</div>
              <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;">${node.data.position}</div>
            </div>
          </div>`;
      })
      .onNodeClick((d) => console.log(d + ' node clicked'))
      .render();
  }
}
