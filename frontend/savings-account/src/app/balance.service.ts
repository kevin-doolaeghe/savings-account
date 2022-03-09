import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { TransferType } from './transfer.service';

export class BalanceSheet {

  constructor(public sheet: Array<BalanceEntry> = [], public total: number = 0) { }

  isEmpty(): boolean {
    return this.sheet.length == 0;
  }

  calculateTotal(): void {
    this.total = 0;
    this.sheet.forEach(entry => {
      this.total += entry.amount;
    });
  }

  getRepartition(): Array<number> {
    let set: Array<number> = [];
    if (this.total == 0) this.calculateTotal();
    if (this.total == 0) return set;
    this.sheet.forEach(entry => set.push(entry.amount / this.total * 100));
    return set;
  }

}

export class BalanceEntry {

  constructor(public type: TransferType, public amount: number) { }

}

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  private url = 'http://localhost:8080/transfers/balance';
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  getBalanceSheet(): Observable<BalanceSheet> {
    return this.http.get<BalanceEntry[]>(this.url, this.httpOptions).pipe(
      map(sheet => new BalanceSheet(sheet)),
      tap(_ => this.log(`fetched balance sheet`)),
      catchError(this.handleError<BalanceSheet>(`getBalanceSheet`)),
    );
  }

  getBalanceDatasets(): Observable<Array<any>> {
    const url = `${this.url}/datasets`;
    return this.http.get<Array<any>>(url, this.httpOptions).pipe(
      tap(_ => this.log(`fetched balance datasets`)),
      catchError(this.handleError<Array<any>>(`getBalanceDatasets`)),
    );
  }

  getTypeIcon(type: TransferType): string {
      switch (type) {
      case TransferType.SAVINGS:
          return "💸 Savings";
      case TransferType.PLEASURE:
          return "🎁 Pleasure";
      case TransferType.VEHICLE:
          return "🚗 Vehicle";
      case TransferType.CLOTHES:
          return "👕 Clothes";
      default:
          return "";
      }
  }

  getAmountColor(amount: number): string {
    if (amount > 0) return 'green';
    else if (amount < 0) return 'red';
    else return 'yellow';
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
