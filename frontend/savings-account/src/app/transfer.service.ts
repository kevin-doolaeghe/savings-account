import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../environments/environment';

import { Transfer, ITransfer } from './transfer';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private notifier = new Subject<any>();

  constructor(private http: HttpClient) { }

  public getTransferList(): Observable<Array<Transfer>> {
    return this.http.get<Array<ITransfer>>(`${API_URL}/transfers`).pipe(
      tap(_ => this.log(`fetched transfer list`)),
      map(transferList => transferList.map(transfer => new Transfer(
          transfer.id,
          transfer.description,
          transfer.date,
          transfer.value,
          transfer.type,
          transfer.status
      ))),
      catchError(this.handleError<Array<Transfer>>(`getTransferList`)),
    );
  }

  public getTransferById(id: number): Observable<Transfer> {
    return this.http.get<Transfer>(`${API_URL}/transfers/${id}`).pipe(
      tap(_ => this.log(`fetched transfer id=${id}`)),
      catchError(this.handleError<Transfer>(`getTransfer id=${id}`)),
    );
  }

  createTransfer(transfer: Transfer): Observable<Transfer> {
    return this.http.post<Transfer>(`${API_URL}/transfers`, transfer).pipe(
      tap((newTransfer: Transfer) => this.log(`added transfer id=${newTransfer.id}`)),
      catchError(e => {
        console.error(e);
        throw e;
      })
    );
  }

  deleteTransferById(id: number): Observable<Transfer> {
    return this.http.delete<Transfer>(`${API_URL}/transfers/${id}`).pipe(
      tap(_ => this.log(`deleted transfer id=${id}`)),
      catchError(this.handleError<Transfer>('deleteTransfer')),
    );
  }

  updateTransfer(transfer: Transfer): Observable<any> {
    return this.http.patch(`${API_URL}/transfers/${transfer.id}`, transfer).pipe(
      tap(_ => this.log(`updated transfer id=${transfer.id}`)),
      catchError(e => {
        console.error(e);
        throw e;
      }),
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
