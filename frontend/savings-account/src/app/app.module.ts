import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { TransferListComponent } from './transfer-list/transfer-list.component';
import { TransferCreatorComponent } from './transfer-creator/transfer-creator.component';
import { TransferDestroyerComponent } from './transfer-destroyer/transfer-destroyer.component';
import { TransferEditorComponent } from './transfer-editor/transfer-editor.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';

import { TransferService } from './transfer.service';

@NgModule({
  declarations: [
    AppComponent,
    TransferListComponent,
    TransferCreatorComponent,
    TransferDestroyerComponent,
    TransferEditorComponent,
    BalanceSheetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    TransferService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
