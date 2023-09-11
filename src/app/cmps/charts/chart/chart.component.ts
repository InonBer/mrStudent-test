import { Component, Input } from '@angular/core';
import { ChartData } from 'src/app/models/chart.model';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  @Input()index: number = 0;
  @Input() chartKey: string = '';
  @Input() lineChartData: ChartData[] = [];
  @Input() lineChartLabels: string[] = [];
  @Input() lineChartOptions: ChartOptions = { responsive: true };
  @Input() chartType: ChartType = 'line'; // New @Input() property for chartType
  
  chartName: string = '';
  chartExplanation: string = '';

  ngOnInit() {
    switch (this.chartKey) {
      case 'chart1':
        this.chartName = 'Chart Number 1';
        this.chartExplanation = 'Grades average over time for students with ID';
        break;
      case 'avgChart':
        this.chartName = 'Chart Number 2';
        this.chartExplanation = 'Students average for students with chosen IDs';
        break;
      case 'barChart':
        this.chartName = 'Chart Number 3';
        this.chartExplanation = 'Grades averages per subject';
        break;
      default:
        this.chartName = 'Unknown';
        this.chartExplanation = 'No information available.';
    
      } 
     }
}
