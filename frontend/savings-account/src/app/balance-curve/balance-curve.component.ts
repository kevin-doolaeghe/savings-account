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
    {},
  );

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
