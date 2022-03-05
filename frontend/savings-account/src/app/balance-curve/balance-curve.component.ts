import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

import { Chart } from '../chart';

@Component({
  selector: 'app-balance-curve',
  templateUrl: './balance-curve.component.html',
  styleUrls: ['./balance-curve.component.css']
})
export class BalanceCurveComponent implements OnInit {

  @Input() chart: any = new Chart(
    "Balance sheet by type",
    "line",
    {
      labels: [],
      datasets: [
        { label: 'Savings', data: [] },
        { label: 'Pleasure', data: [] },
        { label: 'Clothes', data: [] },
        { label: 'Vehicle', data: [] },
      ],
    },
    {}
  );

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: this.chart.title,
      },
    },
  };

  constructor() { }

  ngOnInit(): void {
  }

}
