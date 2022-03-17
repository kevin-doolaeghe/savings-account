import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable, Subject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export class Transfer {
  constructor(
      public id: number = -1,
      public description: string = "",
      public date: Date = new Date(),
      public value: number = 0,
      public type: TransferType = TransferType.SAVINGS,
      public status: boolean = false) { }
}

export enum TransferType {
  SAVINGS,
  PLEASURE,
  VEHICLE,
  CLOTHES,
}

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private notifier = new Subject<any>();

  private url = 'http://localhost:8080/transfers';
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  getTransferList(): Observable<Transfer[]> {
    return this.http.get<Transfer[]>(this.url, this.httpOptions).pipe(
      tap(_ => this.log(`fetched transfer list`)),
      catchError(this.handleError<Transfer[]>(`getTransferList`)),
    );
  }

  getTransfer(id: number): Observable<Transfer> {
    const url = `${this.url}/${id}`;
    return this.http.get<Transfer>(url, this.httpOptions).pipe(
      tap(_ => this.log(`fetched transfer id=${id}`)),
      catchError(this.handleError<Transfer>(`getTransfer id=${id}`)),
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
      catchError(this.handleError<Transfer>('deleteTransfer')),
    );
  }

  updateTransfer(transfer: Transfer): Observable<any> {
    const url = `${this.url}/${transfer.id}`;
    return this.http.patch(url, transfer, this.httpOptions).pipe(
      tap(_ => this.log(`updated transfer id=${transfer.id}`)),
      catchError(e => {
        console.error(e);
        throw e;
      }),
    );
  }

  getTypeIcon(type: TransferType): string {
    switch (type) {
    case TransferType.SAVINGS:
      return '💸';
    case TransferType.PLEASURE:
      return '🎁';
    case TransferType.CLOTHES:
      return '👕';
    case TransferType.VEHICLE:
      return '🚗';
    default:
      return '';
    }
  }
  
  getTypeName(type: TransferType): string {
    switch (type) {
    case TransferType.SAVINGS:
      return "Savings";
    case TransferType.PLEASURE:
      return "Pleasure";
    case TransferType.VEHICLE:
      return "Vehicle";
    case TransferType.CLOTHES:
      return "Clothes";
    default:
      return "";
    }
  }

  getStatusIcon(status: boolean): string {
    if (status) return '✔️';
    else return '❌';
  }

  getValueColor(value: number): string {
    if (value > 0) return 'green';
    else if (value < 0) return 'red';
    else return 'yellow';
  }

  getFormattedDate(date: Date): any {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
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
