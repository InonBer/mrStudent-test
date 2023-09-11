import { ChartOptions, ChartType } from 'chart.js';

export interface ChartData {
    data: number[];
   label: string ;
   lineChartLabels: string[];
  }

export interface ChartsData {
    [key: string] :ChartData[]
}