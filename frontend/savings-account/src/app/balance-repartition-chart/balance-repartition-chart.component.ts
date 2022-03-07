import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-balance-repartition-chart',
  templateUrl: './balance-repartition-chart.component.html',
  styleUrls: ['./balance-repartition-chart.component.css']
})
export class BalanceRepartitionChartComponent implements OnInit {

  @Input() balanceSheet: any = [];

  @Input() total: number = 0;

  chartData: ChartData = {
    labels: [ '💸 Savings', '🎁 Pleasure', '👕 Clothes', '🚗 Vehicle' ],
    datasets: [],
  };

  chartOptions: ChartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Repartition of different types",
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 10,
        },
      },
    },
    responsive: true,
  };

  chartType: ChartType = "pie";

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor() { }

  ngOnInit(): void {
    let percentSet = [];
    for (let i = 0; i < this.balanceSheet.length; i++) {
      percentSet[i] = this.balanceSheet[i].amount / this.total * 100;
    }
    console.log(percentSet);

    this.chartData.datasets = [{ data: percentSet }];
  }

}
