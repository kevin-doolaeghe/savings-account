import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

export class BalanceSheet {

  constructor(public sheet: Array<BalanceEntry> = []) { }

  isEmpty(): boolean {
    return this.sheet.length == 0;
  }

  getTotal(): number {
    let total =  this.sheet.find(e => e.type < 0);
    return total ? total.value : 0;
  }

  getPercentageSet(): Array<number> {
    let total = this.getTotal();
    return this.sheet.filter(e => e.value >= 0).map(e => e.value / total * 100);
  }

}

export class BalanceEntry {
  constructor(public type: number, public value: number) { }
}

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  private url = 'http://localhost:8080/balance';
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

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

  getTypeIcon(type: number): string {
    switch (type) {
    case 0:
      return '💸';
    case 1:
      return '🎁';
    case 2:
      return '👕';
    case 3:
      return '🚗';
    case -1:
      return '⚖️';
    default:
      return '';
    }
  }
  
  getTypeName(type: number): string {
    switch (type) {
    case 0:
      return "Savings";
    case 1:
      return "Pleasure";
    case 2:
      return "Vehicle";
    case 3:
      return "Clothes";
    case -1:
      return 'Total';
    default:
      return "";
    }
  }

  getValueColor(value: number): string {
    if (value > 0) return 'green';
    else if (value < 0) return 'red';
    else return 'yellow';
  }

  getFormattedDate(date: Date): any {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  isTotal(type: number): boolean {
    return type < 0;
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
