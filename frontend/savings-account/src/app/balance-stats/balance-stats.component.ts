import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';

import { TransferService } from '../transfer.service';

export class Data {

  constructor(
    public time: Array<Date> = [],
    public savings: Array<any> = [],
    public pleasure: Array<any> = [],
    public clothes: Array<any> = [],
    public vehicle: Array<any> = [],
    public total: Array<any> = []) { }

}

@Component({
  selector: 'app-balance-stats',
  templateUrl: './balance-stats.component.html',
  styleUrls: ['./balance-stats.component.css']
})
export class BalanceStatsComponent implements OnInit {

  chartTitle1: String = "Balance sheet by type";
  chartData1: ChartData = {
    labels: [],
    datasets: [],
  };

  chartTitle2: String = "Total balance";
  chartData2: ChartData = {
    labels: [],
    datasets: [],
  };
  
  datasets: any = [];
  sub: any;

  constructor(private service: TransferService) {
    this.service.getBalanceDatasets().subscribe({
      next: data => this.datasets = data,
      error: (e) => console.error(e),
      complete: () => {
        console.info('complete');
        console.log(this.datasets);
        if (this.datasets.length != 0) this.setupChartData();
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
          console.log(this.datasets);
          if (this.datasets.length != 0) this.setupChartData();
        }
      });
    });
  }
  
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  setupChartData(): void {
    let data = this.setupDatasets();
    
    this.chartData1 = {
      labels: data.time,
      datasets: [
        { label: '💸 Savings', data: data.savings, backgroundColor: 'rgba(66,133,244,0.2)', borderColor: 'rgba(66,133,244,0.2)' },
        { label: '🎁 Pleasure', data: data.pleasure, backgroundColor: 'rgba(219,68,55,0.2)', borderColor: 'rgba(219,68,55,0.2)' },
        { label: '👕 Clothes', data: data.clothes, backgroundColor: 'rgba(244,180,0,0.2)', borderColor: 'rgba(244,180,0,0.2)' },
        { label: '🚗 Vehicle', data: data.vehicle, backgroundColor: 'rgba(15,157,88,0.2)', borderColor: 'rgba(15,157,88,0.2)' },
      ],
    };

    this.chartData2 = {
      labels: data.time,
      datasets: [
        {
          label: '⚖️ Total',
          data: data.total,
          backgroundColor: 'rgba(66,133,244,0.2)',
          borderColor: 'rgba(66,133,244,0.2)',
          tension: 0.5,
        },
      ],
    };
  }

  setupDatasets(): Data {
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

    return data;
  }

  private log(message: string) {
    console.log(`BalanceStatsComponent: ${message}`);
  }

}
