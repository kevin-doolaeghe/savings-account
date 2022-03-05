import { Component, OnDestroy, OnInit } from '@angular/core';

import { TransferType } from '../transfer';
import { TransferService } from '../transfer.service';
import { Chart } from '../chart';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.css']
})
export class BalanceSheetComponent implements OnInit, OnDestroy {

  title = "Balance sheet:";
  balanceSheet: any = [];
  total = 0;
  sub: any;
  chart: any = new Chart(
    "Balance sheet by type",
    "line",
    {
      labels: [],
      datasets: [
        { label: 'Savings', data: [1000, 1200, 1050, 2000, 500] },
        { label: 'Pleasure', data: [200, 100, 400, 50, 90] },
        { label: 'Clothes', data: [500, 400, 350, 450, 650] },
        { label: 'Vehicle', data: [1200, 1500, 1020, 1600, 900] },
      ],
    },
    {}
  );

  constructor(private service: TransferService) {
    this.service.getBalanceSheet().subscribe({
      next: (v) => {
        console.log(v);
        this.balanceSheet = v;
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
        console.info('complete');
        this.calculateTotal();
      }
    });
  }

  ngOnInit(): void {
    this.total = 0;
    this.sub = this.service.getUpdate().subscribe(message => {
      this.service.getBalanceSheet().subscribe({
        next: (v) => {
          console.log(v);
          this.balanceSheet = v;
        },
        error: (e) => {
          console.error(e);
        },
        complete: () => {
          console.info('complete');
          this.calculateTotal();
        }
      });
    })
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  calculateTotal() {
    this.total = 0;
    for (let i = 0; i < this.balanceSheet.length; i++) {
      this.total += this.balanceSheet[i].amount;
    }
  }

  getTypeIcon(type: TransferType): String {
    switch (type) {
      case TransferType.SAVINGS:
        return "💸";
      case TransferType.PLEASURE:
        return "🎁";
      case TransferType.CLOTHES:
        return "👕";
      case TransferType.VEHICLE:
        return "🚗";
      default:
        return "";
    }
  }

  selectColor(amount: number): String {
    if (amount > 0) {
      return 'green';
    } else if (amount < 0) {
      return 'red';
    } else {
      return 'yellow';
    }
  }

  isEmptyBalance(): boolean {
    return this.balanceSheet.length == 0;
  }

}
