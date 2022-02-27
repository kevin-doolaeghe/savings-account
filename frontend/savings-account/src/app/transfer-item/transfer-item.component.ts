import { Component, Input, OnInit } from '@angular/core';

import { TransferService } from '../transfer.service';

@Component({
  selector: 'app-transfer-item',
  templateUrl: './transfer-item.component.html',
  styleUrls: ['./transfer-item.component.css']
})
export class TransferItemComponent implements OnInit {

  @Input() transfer: any = null;

  showEditor: Boolean = false;

  constructor(private service: TransferService) { }

  ngOnInit(): void {
  }

  selectColor(): String {
    let amount = this.transfer.amount;
    if (amount > 0) {
      return 'green';
    } else if (amount < 0) {
      return 'red';
    } else {
      return 'yellow';
    }
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
