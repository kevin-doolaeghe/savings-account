import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';

import { Chart } from '../chart';

@Component({
  selector: 'app-balance-curve',
  templateUrl: './balance-curve.component.html',
  styleUrls: ['./balance-curve.component.css']
})
export class BalanceCurveComponent implements OnInit {

  @Input() chart: any = new Chart(
    "Chart",
    "line",
    {
      labels: [],
      datasets: [],
    },
    {}
  );

  chartOptions: ChartOptions = {
    plugins: {
      title: {
        display: true,
        text: this.chart.title,
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
            day: 'DD/MM/YYYY',
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
