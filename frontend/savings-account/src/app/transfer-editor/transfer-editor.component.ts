import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { TransferService } from '../transfer.service';
import { Transfer, TransferType } from '../transfer';

interface Type {
  value: TransferType;
  name: String;
}

interface Status {
  value: Boolean;
  name: String;
}

@Component({
  selector: 'app-transfer-editor',
  templateUrl: './transfer-editor.component.html',
  styleUrls: ['./transfer-editor.component.css']
})
export class TransferEditorComponent implements OnInit {

  transferTypes: Type[] = [
    { value: TransferType.SAVINGS, name: 'Savings' },
    { value: TransferType.PLEASURE, name: 'Pleasure' },
    { value: TransferType.CLOTHES, name: 'Clothes' },
    { value: TransferType.VEHICLE, name: 'Vehicle' }
  ];

  transferStatus: Status[] = [
    { value: true, name: "Done" },
    { value: false, name: "Waiting" }
  ];

  @Input() transfer: any = null;

  transferForm = this.fb.group({
    description: ['', Validators.required],
    date: ['', Validators.required],
    amount: ['', Validators.required],
    type: ['', Validators.required],
    status: ['', Validators.required]
  });

  error = "";

  constructor(private fb: FormBuilder, private service: TransferService) { }

  ngOnInit(): void {
    if (this.transfer == null) return;
    this.transferForm = this.fb.group({
      description: [this.transfer.description, Validators.required],
      date: [this.transfer.date, Validators.required],
      amount: [this.transfer.amount, Validators.required],
      type: [this.transfer.type, Validators.required],
      status: [this.transfer.status, Validators.required]
    });
  }

  updateTransfer() {
    this.service.updateTransfer(this.transferForm.value as Transfer).subscribe({
      next: (v) => {
        console.log(v);
        this.service.sendUpdate("update from TransferEditorComponent");
      },
      error: (e) => {
        console.error(e);
        switch (e.status) {
          case 404:
            this.error = "Given transfer does not exist.";
            break;
          default:
            this.error = "An error occured.";
        }
      },
      complete: () => {
        console.info('complete');
        this.transferForm.reset();
        this.error = "Successfully updated transfer.";
      }
    });
  }

}
