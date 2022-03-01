import { Component, OnInit } from '@angular/core';

import { Balance } from '../balance';
import { TransferService } from '../transfer.service';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.css']
})
export class BalanceSheetComponent implements OnInit {

  title = "Balance sheet:";
  balanceSheet: any = [];
  sub: any;

  constructor(private service: TransferService) {
    this.service.getBalanceSheet().subscribe(res => this.balanceSheet = res);
  }

  ngOnInit(): void {
    this.sub = this.service.getUpdate().subscribe(message => {
      this.service.getBalanceSheet().subscribe(res => this.balanceSheet = res);
    })
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
  
  getBalanceIcon(id: number): String {
    switch (id) {
      case 0:
        return "⚖️";
      case 1:
        return "💸";
      case 2:
        return "🎁";
      case 3:
        return "👕";
      case 4:
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
