import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Transfer, TransferService } from '../transfer.service';

@Component({
  selector: 'tr[app-transfer-item]',
  templateUrl: './transfer-item.component.html',
  styleUrls: ['./transfer-item.component.css']
})
export class TransferItemComponent implements OnInit {

  @Input() transfer: Transfer = new Transfer();

  showEditor: Boolean = false;

  get showTransferEditor() {
    return this.showEditor;
  }

  constructor(public service: TransferService, public datePipe: DatePipe) { }

  ngOnInit(): void { }

  editTransfer() {
    this.showEditor = !this.showEditor;
  }

  deleteTransfer() {
    this.service.deleteTransfer(this.transfer.id).subscribe(
      _ => this.service.sendUpdate("Update from TransferDestroyerComponent")
    );
  }

}
