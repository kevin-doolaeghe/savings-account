import { Component, Input, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';

import { TransferType } from '../transfer';
import { TransferService } from '../transfer.service';

@Component({
  selector: 'tr[app-transfer-item]',
  templateUrl: './transfer-item.component.html',
  styleUrls: ['./transfer-item.component.css']
})
export class TransferItemComponent implements OnInit {

  @Input() transfer: any = null;

  showEditor: Boolean = false;

  constructor(private service: TransferService, private datePipe: DatePipe) { }

  ngOnInit(): void {
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

  getTypeIcon(): String {
    switch (this.transfer.type) {
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

  getStatusIcon(): String {
    switch (this.transfer.status) {
      case true:
        return "✅";
      case false:
        return "❎";
      default:
        return "";
    }
  }

  getFormattedDate(): any {
    return this.datePipe.transform(this.transfer.date, 'dd/MM/yyyy');
  }

  editTransfer() {
    this.showEditor = !this.showEditor;
  }

  deleteTransfer() {
    this.service.deleteTransfer(this.transfer.id).subscribe(
      _ => this.service.sendUpdate("update from TransferDestroyerComponent")
    );
  }

  get showTransferEditor() {
    return this.showEditor;
  }

}
