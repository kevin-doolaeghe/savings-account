import { Component, Input, OnInit } from '@angular/core';

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

  chartOptions: any = {
    plugins: {
      title: {
        display: true,
        text: this.chart.title,
      },
    },
    legend: {
      display: true,
      position: 'top',
      labels: {
        boxWidth: 10,
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'DD/MM/YYYY',
            },
          },
          stacked: true,
          gridLines: {
            display: true,
          },
        },
      ],
      yAxes: [
        {
          stacked: true,
          gridLines: {
            display: true,
          },
        },
      ],
    },
    scaleShowVerticalLines: false,
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
