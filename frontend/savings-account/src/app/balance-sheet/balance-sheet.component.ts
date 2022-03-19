import { Component, OnInit } from '@angular/core';

import { BalanceSheet } from '../balance-sheet';
import { BalanceService } from '../balance.service';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.css']
})
export class BalanceSheetComponent implements OnInit {
  balanceSheet: BalanceSheet = new BalanceSheet();

  constructor(public service: BalanceService) {
    this.service.getBalanceSheet().subscribe({
      next: (sheet) => this.balanceSheet = sheet,
      error: (err) => console.error(err),
      complete: () => console.log(this.balanceSheet),
    });
  }

  ngOnInit(): void { }
}
