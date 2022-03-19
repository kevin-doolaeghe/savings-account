import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../environments/environment';

import { BalanceEntry, BalanceSheet, IBalanceSheet } from './balance-sheet';
import { BalanceData, IBalanceDataset } from './balance-dataset';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  constructor(private http: HttpClient) { }

  public getBalanceSheet(): Observable<BalanceSheet> {
    return this.http.get<IBalanceSheet>(`${API_URL}/balance`).pipe(
      map(sheet => new BalanceSheet(
        sheet.entries.map(entry => new BalanceEntry(
          entry.type,
          entry.value,
        )),
        sheet.total
      )),
      tap(_ => this.log(`fetched balance sheet`)),
      catchError(this.handleError<BalanceSheet>(`getBalanceSheet`)),
    );
  }

  public getBalanceDatasets(): Observable<BalanceData> {
    return this.http.get<Array<IBalanceDataset>>(`${API_URL}/balance/datasets`).pipe(
      tap(_ => this.log(`fetched balance datasets`)),
      map(datasets => BalanceData.toBalanceData(datasets)),
      catchError(this.handleError<BalanceData>(`getBalanceDatasets`)),
    );
  }

  private log(message: string) {
    console.log(`TransferService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);  
      return of(result as T);
    };
  }
}
