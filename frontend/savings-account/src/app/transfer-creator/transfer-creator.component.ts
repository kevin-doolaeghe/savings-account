import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Transfer, transferStatus, transferTypes } from '../transfer';
import { TransferService } from '../transfer.service';

@Component({
  selector: 'app-transfer-creator',
  templateUrl: './transfer-creator.component.html',
  styleUrls: ['./transfer-creator.component.css']
})
export class TransferCreatorComponent implements OnInit {
  transferForm = this.fb.group({
    description: ['', Validators.required],
    date: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
    amount: ['', Validators.required],
    type: [transferTypes[0].value, Validators.required],
    status: [transferStatus[0].value, Validators.required]
  });
  selectOptions = { types: transferTypes, status: transferStatus };
  error = "";
  
  showCreator: Boolean = false;

  get showTransferCreator() {
    return this.showCreator;
  }

  constructor(private fb: FormBuilder, private datePipe: DatePipe, private service: TransferService) { }

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
        this.transferForm = this.fb.group({
          description: ['', Validators.required],
          date: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
          amount: ['', Validators.required],
          type: [transferTypes[0].value, Validators.required],
          status: [transferStatus[0].value, Validators.required]
        });
        this.error = "Successfully added transfer.";
      }
    });
  }

  addTransfer() {
    this.showCreator = !this.showCreator;
  }
}
