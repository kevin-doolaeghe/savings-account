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
    labels: [ '💸 Savings', '🎁 Pleasure', '🚗 Vehicle', '👕 Clothes' ],
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
      tooltip: {
        callbacks: {
          label: context => {
            return context.label + ": " + context.formattedValue + "%";
          },
        },
      },
    },
    responsive: true,
  };

  chartType: ChartType = "doughnut";

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

    this.chartData.datasets = [{
      data: percentSet,
      backgroundColor: [ 'rgba(66,133,244,0.7)', 'rgba(219,68,55,0.7)', 'rgba(244,180,0,0.7)', 'rgba(15,157,88,0.7)'  ],
      borderColor: 'rgba(0,0,0,0)',
      hoverBackgroundColor: [ 'rgba(66,133,244,1)', 'rgba(219,68,55,1)', 'rgba(244,180,0,1)', 'rgba(15,157,88,1)' ],
      hoverBorderColor: [ 'rgba(66,133,244,1)', 'rgba(219,68,55,1)', 'rgba(244,180,0,1)', 'rgba(15,157,88,1)' ],
      fill: 'origin',
    }];
  }

}
