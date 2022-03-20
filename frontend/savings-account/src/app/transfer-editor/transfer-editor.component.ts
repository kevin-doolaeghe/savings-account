import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Transfer, transferTypes, transferStatus } from '../transfer';
import { TransferService } from '../transfer.service';

@Component({
  selector: 'app-transfer-editor',
  templateUrl: './transfer-editor.component.html',
  styleUrls: ['./transfer-editor.component.css']
})
export class TransferEditorComponent implements OnInit {
  @Input() transfer: Transfer = new Transfer();
  
  transferForm = this.fb.group({
    id: [-1],
    description: ['', Validators.required],
    date: ['', Validators.required],
    value: ['', Validators.required],
    type: ['', Validators.required],
    status: ['', Validators.required]
  });
  selectOptions = { types: transferTypes, status: transferStatus };
  error = '';

  constructor(private fb: FormBuilder, private service: TransferService) { }

  ngOnInit(): void {
    if (this.transfer == null) return;
    this.transferForm = this.fb.group({
      id: [this.transfer.id],
      description: [this.transfer.description, Validators.required],
      date: [this.transfer.getFormattedDate(), Validators.required],
      value: [this.transfer.value, Validators.required],
      type: [this.transfer.type, Validators.required],
      status: [this.transfer.status, Validators.required]
    });
  }

  updateTransfer() {
    this.service.updateTransfer(this.transferForm.value as Transfer).subscribe({
      next: (v) => {
        console.log(v);
        this.service.sendUpdate('Update from TransferEditorComponent');
      },
      error: (e) => {
        console.error(e);
        switch (e.status) {
          case 404:
            this.error = 'Given transfer does not exist.';
            break;
          default:
            this.error = 'An error occured.';
        }
      },
      complete: () => {
        this.error = 'Successfully updated transfer.';
      }
    });
  }
}
