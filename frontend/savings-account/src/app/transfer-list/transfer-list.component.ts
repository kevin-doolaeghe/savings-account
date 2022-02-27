import { Component, OnInit, OnDestroy  } from '@angular/core';

import { TransferService } from '../transfer.service';
import { Transfer, TransferType } from '../transfer';

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.css']
})
export class TransferListComponent implements OnInit, OnDestroy {

  title = "Transfer list:";
  transferList: any;
  sub: any;

  constructor(private service: TransferService) {
    // this.service.getTransferList().subscribe(list => this.transferList = list);
    this.transferList = [
      new Transfer(1, 'test', new Date(), 100, TransferType.SAVINGS, true),
      new Transfer(4, 'test2', new Date(), -50, TransferType.CLOTHES, false),
      new Transfer(12, 'test3', new Date(), 0, TransferType.PLEASURE, false)
    ];
  }

  ngOnInit(): void {
    this.sub = this.service.getUpdate().subscribe(message => {
      this.log(message);
      // this.service.getTransferList().subscribe(list => this.transferList = list);
    })
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  private log(message: string) {
    console.log(`TransferListComponent: ${message}`);
  }

}
