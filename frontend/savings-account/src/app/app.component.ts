import { Component } from '@angular/core';

export type ContentType = 'transfers' | 'balance';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = "Savings Account";

  content: ContentType = 'transfers';

  get showTransfersContent() {
    return this.content === 'transfers';
  }

  get showBalanceContent() {
    return this.content === 'balance';
  }

  toggleEditor(type: ContentType) {
    this.content = type;
  }
}
