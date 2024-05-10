import { Component, OnInit, Input, ViewChild, ElementRef, ViewEncapsulation } from "@angular/core";
import { EquipeService } from "app/services/equipe.service";
import { OrgChart } from "d3-org-chart";

@Component({
  selector: "app-d3-org-chart",
  templateUrl: "./d3-org-chart.component.html",
  styleUrls: ["./d3-org-chart.component.scss"],
  encapsulation: ViewEncapsulation.None,
  standalone:true
})
export class D3OrgChartComponent implements OnInit {
  @ViewChild("chartContainer", { static: true }) chartContainer: ElementRef;
  @Input() data: any[];
  chart: OrgChart;

  constructor(private equipeService: EquipeService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.equipeService.getEquipe().subscribe(
      (data: any[]) => {
        this.data = data;
        this.updateChart();
      },
      (error) => {
        console.error('Error fetching equipe data:', error);
        // Handle error appropriately, e.g., show error message to user
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
    if (!this.chart) {
      return;
    }
    this.chart
      .container(this.chartContainer.nativeElement)
      .data(this.data)
      .nodeContent((node) => {
        // Your node content generation logic
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
