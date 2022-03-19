import { Component, Input, OnInit } from '@angular/core';

import { Transfer } from '../transfer';
import { TransferService } from '../transfer.service';

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

  constructor(public service: TransferService) { }

  ngOnInit(): void { }

  editTransfer() {
    this.showEditor = !this.showEditor;
  }

  deleteTransfer() {
    this.service.deleteTransferById(this.transfer.id).subscribe(
      _ => this.service.sendUpdate("update from TransferDestroyerComponent")
    );
  }
}
