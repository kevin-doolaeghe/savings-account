import { Component, OnInit } from '@angular/core';
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
  selector: 'app-transfer-creator',
  templateUrl: './transfer-creator.component.html',
  styleUrls: ['./transfer-creator.component.css']
})
export class TransferCreatorComponent implements OnInit {

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

  transferForm = this.fb.group({
    description: ['', Validators.required],
    date: [''],
    amount: ['', Validators.required],
    type: [this.transferTypes[0].value, Validators.required],
    status: [this.transferStatus[0].value, Validators.required]
  });

  error = "";

  constructor(private fb: FormBuilder, private service: TransferService) { }

  ngOnInit(): void {
  }

  createTransfer() {
    this.service.createTransfer(this.transferForm.value as Transfer).subscribe({
      next: (v) => {
        console.log(v);
        this.service.sendUpdate("update from TransferCreatorComponent");
      },
      error: (e) => {
        console.error(e);
        switch (e.status) {
          case 400:
            this.error = "A transfer with the same ID already exists.";
            break;
          default:
            this.error = "An error occured.";
        }
      },
      complete: () => {
        console.info('complete');
        this.transferForm = this.fb.group({
          description: ['', Validators.required],
          date: [''],
          amount: ['', Validators.required],
          type: [this.transferTypes[0].value, Validators.required],
          status: [this.transferStatus[0].value, Validators.required]
        });
        this.error = "Successfully added transfer.";
      }
    });
  }

}
