import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Transfer, TransferService, TransferType } from '../transfer.service';

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
    { value: TransferType.SAVINGS, name: '💸 Savings' },
    { value: TransferType.PLEASURE, name: '🎁 Pleasure' },
    { value: TransferType.CLOTHES, name: '👕 Clothes' },
    { value: TransferType.VEHICLE, name: '🚗 Vehicle' },
  ];

  transferStatus: Status[] = [
    { value: true, name: '✔️ Done' },
    { value: false, name: '❌ Waiting' },
  ];

  transferForm = this.fb.group({
    description: ['', Validators.required],
    date: [this.service.getFormattedDate(new Date()), Validators.required],
    amount: ['', Validators.required],
    type: [this.transferTypes[0].value, Validators.required],
    status: [this.transferStatus[0].value, Validators.required]
  });

  error = "";

  showCreator: Boolean = false;

  get showTransferCreator() {
    return this.showCreator;
  }

  constructor(private fb: FormBuilder, private service: TransferService) { }

  ngOnInit(): void {
  }

  createTransfer() {
    this.service.createTransfer(this.transferForm.value as Transfer).subscribe({
      next: (v) => {
        console.log(v);
        this.service.sendUpdate("Update from TransferCreatorComponent");
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
        this.transferForm = this.fb.group({
          description: ['', Validators.required],
          date: [this.service.getFormattedDate(new Date()), Validators.required],
          amount: ['', Validators.required],
          type: [this.transferTypes[0].value, Validators.required],
          status: [this.transferStatus[0].value, Validators.required]
        });
        this.error = "Successfully added transfer.";
      }
    });
  }

  addTransfer() {
    this.showCreator = !this.showCreator;
  }

}
