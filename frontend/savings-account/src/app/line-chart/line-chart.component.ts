import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() chartTitle: String = "";

  @Input() chartData: ChartData = {
    labels: [],
    datasets: [],
  };

  chartOptions: ChartOptions = {
    plugins: {
      title: {
        display: true,
        text: "",
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 10,
        },
      },
    },
    elements: {
      line: {
        tension: 0,
      },
    },
    scales: {
      x: {
        stacked: true,
        display: true,
        time: {
          unit: 'day',
          displayFormats: {
            day: 'dd/MM/yyyy',
          },
        },
      },
      y: {
        stacked: true,
        display: true,
      },
    },
    responsive: true,
  };

  chartType: ChartType = "line";

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
