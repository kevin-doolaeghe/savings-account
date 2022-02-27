import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { TransferService } from '../transfer.service';
import { Transfer } from '../transfer';

@Component({
  selector: 'app-transfer-creator',
  templateUrl: './transfer-creator.component.html',
  styleUrls: ['./transfer-creator.component.css']
})
export class TransferCreatorComponent implements OnInit {

  transferForm = this.fb.group({
    description: ['', Validators.required],
    date: [''],
    amount: ['', Validators.required],
    type: ['', Validators.required],
    status: ['', Validators.required]
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
        this.transferForm.reset();
        this.error = "Successfully added transfer.";
      }
    });
  }

}
