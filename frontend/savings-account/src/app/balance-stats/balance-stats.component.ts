import { Component, OnInit } from '@angular/core';

import { TransferService } from '../transfer.service';
import { Chart, Data } from '../chart';

@Component({
  selector: 'app-balance-stats',
  templateUrl: './balance-stats.component.html',
  styleUrls: ['./balance-stats.component.css']
})
export class BalanceStatsComponent implements OnInit {

  chart: any = new Chart(
    "Balance sheet by type",
    "line",
    {
      labels: [],
      datasets: [],
    },
    {}
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
      data.savings[i] = data.savings[i != 0 ? i - 1 : 0] + row[1];
      data.pleasure[i] = data.pleasure[i != 0 ? i - 1 : 0] + row[2];
      data.clothes[i] = data.clothes[i != 0 ? i - 1 : 0] + row[3];
      data.vehicle[i] = data.vehicle[i != 0 ? i - 1 : 0] + row[4];
      data.total[i] = data.total[i != 0 ? i - 1 : 0] + row[5];
    });

    console.log(data);
    this.chart.data = {
      labels: data.time,
      datasets: [
        { label: 'Savings', data: data.savings },
        { label: 'Pleasure', data: data.pleasure },
        { label: 'Clothes', data: data.clothes },
        { label: 'Vehicle', data: data.vehicle },
      ],
    };
  }

  /*
  buildAxisData(x1: Array<any>, y1: Array<any>, x2: Array<any>, y2: Array<any>): any {
    let x = [];
    let _y1 = [];
    let _y2 = [];
    let l1 = x1.length;
    let l2 = x2.length;
    let i1 = 0;
    let i2 = 0;
    let i = 0;
    while (i1 < l1 || i2 < l2) {
      x[i] = x1[i1] < x2[i2] ? x1[i1] : x2[i2];
      if (x1[i1] == x[i])
        _y1[i] = i1 != l1 ? y1[i1++] : i != 0 ? _y1[i - 1] : 0;
      else _y1[i] = i != 0 ? _y1[i - 1] : 0;
      if (x2[i2] == x[i])
        _y2[i] = i2 != l2 ? y2[i2++] : i != 0 ? _y2[i - 1] : 0;
      else _y2[i] = i != 0 ? _y2[i - 1] : 0;
      console.log(`x:${x[i]}; i1:${i1}; i2:${i2}`);
      i++;
    }
    return { x: x, y1: _y1, y2: _y2 };
  }
  */

  private log(message: string) {
    console.log(`TransferListComponent: ${message}`);
  }

}
