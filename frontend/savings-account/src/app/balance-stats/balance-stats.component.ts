import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';

import { BalanceData } from '../balance-dataset';
import { BalanceService } from '../balance.service';

@Component({
  selector: 'app-balance-stats',
  templateUrl: './balance-stats.component.html',
  styleUrls: ['./balance-stats.component.css']
})
export class BalanceStatsComponent implements OnInit {
  chartTitle1: string = "Balance sheet by type";
  chartData1: ChartData = { labels: [], datasets: [] };

  chartTitle2: string = "Total balance";
  chartData2: ChartData = { labels: [], datasets: [] };
  
  data: BalanceData = new BalanceData();
  sub: any;

  constructor(private service: BalanceService) {
    this.service.getBalanceDatasets().subscribe({
      next: (data) => this.data = data,
      error: (err) => console.error(err),
      complete: () => this.setupChartData(),
    });
  }

  ngOnInit(): void { }
  
  setupChartData(): void {
    if (this.data.isEmpty()) return;

    this.chartData1 = {
      labels: this.data.time,
      datasets: [
        {
          label: '💸 Savings',
          data: this.data.savings,
          backgroundColor: 'rgba(66,133,244,0.7)',
          borderColor: 'rgba(66,133,244,1)',
          pointBackgroundColor: 'rgba(66,133,244,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(66,133,244,1)',
          fill: 'origin',
        },
        {
          label: '🎁 Pleasure',
          data: this.data.pleasure,
          backgroundColor: 'rgba(219,68,55,0.7)',
          borderColor: 'rgba(219,68,55,1)',
          pointBackgroundColor: 'rgba(219,68,55,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(219,68,55,1)',
          fill: 'origin',
        },
        {
          label: '🚗 Vehicle',
          data: this.data.vehicle,
          backgroundColor: 'rgba(15,157,88,0.7)',
          borderColor: 'rgba(15,157,88,1)',
          pointBackgroundColor: 'rgba(15,157,88,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(15,157,88,1)',
          fill: 'origin',
        },
        {
          label: '👕 Clothes',
          data: this.data.clothes,
          backgroundColor: 'rgba(244,180,0,0.7)',
          borderColor: 'rgba(244,180,0,1)',
          pointBackgroundColor: 'rgba(244,180,0,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(244,180,0,1)',
          fill: 'origin',
        },
      ],
    };

    this.chartData2 = {
      labels: this.data.time,
      datasets: [
        {
          label: '⚖️ Total',
          data: this.data.total,
          backgroundColor: 'rgba(255,215,0,0.3)',
          borderColor: 'rgba(255,215,0,1)',
          pointBackgroundColor: 'rgba(255,215,0,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,215,0,1)',
          fill: 'origin',
          tension: 0.15,
        },
      ],
    };
  }
}
