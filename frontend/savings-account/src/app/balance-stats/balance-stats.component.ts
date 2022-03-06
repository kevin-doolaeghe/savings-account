import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';

import { TransferService } from '../transfer.service';
import { Chart, Data } from '../chart';

@Component({
  selector: 'app-balance-stats',
  templateUrl: './balance-stats.component.html',
  styleUrls: ['./balance-stats.component.css']
})
export class BalanceStatsComponent implements OnInit {

  @Input() balanceSheet: any = [];

  @Input() total: number = 0;

  lineChartOptions: ChartOptions = {
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

  lineChart1: any = new Chart(
    "Balance sheet by type",
    "line",
    {
      labels: [],
      datasets: [],
    },
    this.lineChartOptions,
  );

  lineChart2: any = new Chart(
    "Total balance",
    "line",
    {
      labels: [],
      datasets: [],
    },
    this.lineChartOptions,
  );

  pieChart1: any = new Chart(
    "Repartition of different types",
    "pie",
    {
      labels: [],
      datasets: [],
    },
    {
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
      responsive: true,
    },
  );
  
  datasets: any = [];
  sub: any;

  constructor(private service: TransferService) {
    this.service.getBalanceDatasets().subscribe({
      next: data => this.datasets = data,
      error: (e) => console.error(e),
      complete: () => {
        console.info('complete');
        this.setupDatasets();
      }
    });
  }

  ngOnInit(): void {
    this.sub = this.service.getUpdate().subscribe(message => {
      this.log(message);
      this.service.getBalanceDatasets().subscribe({
        next: data => this.datasets = data,
        error: (e) => console.error(e),
        complete: () => {
          console.info('complete');
          this.setupDatasets();
        }
      });
    });
  }
  
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  setupDatasets(): void {
    console.log(this.datasets);
    if (this.datasets.length == 0) return;
  
    let data = new Data();
    this.datasets.forEach((row: Array<any>, i: number) => {
      data.time[i] = row[0];
      if (i == 0) {
        data.savings[i] = row[1];
        data.pleasure[i] = row[2];
        data.clothes[i] = row[3];
        data.vehicle[i] = row[4];
        data.total[i] = row[5];
      } else {
        data.savings[i] = data.savings[i - 1] + row[1];
        data.pleasure[i] = data.pleasure[i - 1] + row[2];
        data.clothes[i] = data.clothes[i - 1] + row[3];
        data.vehicle[i] = data.vehicle[i - 1] + row[4];
        data.total[i] = data.total[i - 1] + row[5];
      }
    });
    console.log(data);
    
    this.lineChart1.data = {
      labels: data.time,
      datasets: [
        { label: '💸 Savings', data: data.savings },
        { label: '🎁 Pleasure', data: data.pleasure },
        { label: '👕 Clothes', data: data.clothes },
        { label: '🚗 Vehicle', data: data.vehicle },
      ],
    };

    this.lineChart2.data = {
      labels: data.time,
      datasets: [
        { label: '⚖️ Total', data: data.total },
      ],
    };

    let percentSet = [];
    for (let i = 0; i < this.balanceSheet.length; i++) {
      percentSet[i] = this.balanceSheet[i].amount / this.total * 100;
    }
    console.log(percentSet);
    this.pieChart1.data = {
      labels: [ '💸 Savings', '🎁 Pleasure', '👕 Clothes', '🚗 Vehicle' ],
      datasets: [{ data: percentSet }],
    };
  }

  private log(message: string) {
    console.log(`TransferListComponent: ${message}`);
  }

}
