import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';

import { TransferListComponent } from './transfer-list/transfer-list.component';
import { TransferItemComponent } from './transfer-item/transfer-item.component';
import { TransferCreatorComponent } from './transfer-creator/transfer-creator.component';
import { TransferEditorComponent } from './transfer-editor/transfer-editor.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';

import { TransferService } from './transfer.service';
import { BalanceCurveComponent } from './balance-curve/balance-curve.component';
import { BalanceStatsComponent } from './balance-stats/balance-stats.component';
import { BalanceRepartitionChartComponent } from './balance-repartition-chart/balance-repartition-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    TransferListComponent,
    TransferItemComponent,
    TransferCreatorComponent,
    TransferEditorComponent,
    BalanceSheetComponent,
    BalanceCurveComponent,
    BalanceStatsComponent,
    BalanceRepartitionChartComponent,
    LineChartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgChartsModule,
  ],
  providers: [
    TransferService,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
