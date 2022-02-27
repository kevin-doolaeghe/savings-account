import { Component, Input, OnInit } from '@angular/core';

import { TransferService } from '../transfer.service';

@Component({
  selector: 'app-transfer-destroyer',
  templateUrl: './transfer-destroyer.component.html',
  styleUrls: ['./transfer-destroyer.component.css']
})
export class TransferDestroyerComponent implements OnInit {

  @Input() transferId: number = 0;

  constructor(private service: TransferService) { }

  ngOnInit(): void {
  }

  deleteTransfer() {
    this.service.deleteTransfer(this.transferId).subscribe(
      _ => this.service.sendUpdate("update from TransferDestroyerComponent")
    );
  }

}
