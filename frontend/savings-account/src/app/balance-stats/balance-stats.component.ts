import { Component, OnInit } from '@angular/core';

import { TransferService } from '../transfer.service';
import { Chart } from '../chart';

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

  labels: Array<any> = [];
  data: Array<any> = [];

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
    /*
    let axis = this.buildAxisData(
      this.data1.x,
      this.data1.y,
      this.data2.x,
      this.data2.y
    );
    console.log(axis);

    this.labels = axis.x;
    this.data = [
      { label: 'Savings', data: axis.y1 },
      { label: 'Pleasure', data: axis.y2 },
      { label: 'Clothes', data: [] },
      { label: 'Vehicle', data: [] },
    ];
    */

    if (this.datasets.length == 0) return;
    
    this.labels = this.datasets[0].x;
    this.data = [
      { label: 'Savings', data: this.datasets[0].y },
      { label: 'Pleasure', data: [] },
      { label: 'Clothes', data: [] },
      { label: 'Vehicle', data: [] },
    ];

    this.chart.data = { labels: this.labels, datasets: this.data };
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
