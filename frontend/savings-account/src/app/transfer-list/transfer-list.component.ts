import { Component, OnInit, OnDestroy } from '@angular/core';

import { Transfer } from '../transfer';
import { TransferService } from '../transfer.service';

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.css']
})
export class TransferListComponent implements OnInit, OnDestroy {
  transferList: Array<Transfer> = [];
  sub: any;

  constructor(private service: TransferService) {
    this.service.getTransferList().subscribe(list => this.transferList = list);
  }

  ngOnInit(): void {
    this.sub = this.service.getUpdate().subscribe(message => {
      this.log(message);
      this.service.getTransferList().subscribe(list => this.transferList = list);
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  // todo: undefined at backend start because of empty response
  isEmptyList(): boolean {
    return this.transferList.length == 0;
  }

  private log(message: string) {
    console.log(`TransferListComponent: ${message}`);
  }
}
