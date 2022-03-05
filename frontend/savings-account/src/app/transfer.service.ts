import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Transfer } from './transfer';
import { Balance } from './balance';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private notifier = new Subject<any>();

  private url = 'http://localhost:8080/transfers';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getTransferList(): Observable<Transfer[]> {
    return this.http.get<Transfer[]>(this.url, this.httpOptions).pipe(
      tap(_ => this.log(`fetched transfer list`)),
      catchError(this.handleError<Transfer[]>(`getTransferList`))
    );
  }

  getTransfer(id: number): Observable<Transfer> {
    const url = `${this.url}/${id}`;
    return this.http.get<Transfer>(url, this.httpOptions).pipe(
      tap(_ => this.log(`fetched transfer id=${id}`)),
      catchError(this.handleError<Transfer>(`getTransfer id=${id}`))
    );
  }

  createTransfer(transfer: Transfer): Observable<Transfer> {
    return this.http.post<Transfer>(this.url, transfer, this.httpOptions).pipe(
      tap((newTransfer: Transfer) => this.log(`added transfer id=${newTransfer.id}`)),
      catchError(e => {
        console.error(e);
        throw e;
      })
    );
  }

  deleteTransfer(id: number): Observable<Transfer> {
    const url = `${this.url}/${id}`;
    return this.http.delete<Transfer>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted transfer id=${id}`)),
      catchError(this.handleError<Transfer>('deleteTransfer'))
    );
  }

  updateTransfer(transfer: Transfer): Observable<any> {
    const url = `${this.url}/${transfer.id}`;
    return this.http.patch(url, transfer, this.httpOptions).pipe(
      tap(_ => this.log(`updated transfer id=${transfer.id}`)),
      catchError(e => {
        console.error(e);
        throw e;
      })
    );
  }

  getBalanceSheet(): Observable<Balance[]> {
    const url = `${this.url}/balance`;
    return this.http.get<Balance[]>(url, this.httpOptions).pipe(
      tap(_ => this.log(`fetched balance sheet`)),
      catchError(this.handleError<Balance[]>(`getBalanceSheet`))
    );
  }

  getBalanceDatasets(): Observable<Array<any>> {
    const url = `${this.url}/balance/datasets`;
    return this.http.get<Array<any>>(url, this.httpOptions).pipe(
      tap(_ => this.log(`fetched balance datasets`)),
      catchError(this.handleError<Array<any>>(`getBalanceDatasets`))
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
  
  sendUpdate(message: string) {
    this.notifier.next(message);
  }

  getUpdate(): Observable<any> {
      return this.notifier.asObservable();
  }

}
