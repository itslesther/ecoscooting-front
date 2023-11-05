import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, firstValueFrom, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Book } from '../interfaces';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private backendUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  create(book: any) {
    return firstValueFrom(
      this.http
        .post<Book>(`${this.backendUrl}/books`, book, httpOptions)
        .pipe(retry(3), catchError(this.handleError))
    );
  }

  findAll() {
    return firstValueFrom(
      this.http
        .get<Book[]>(`${this.backendUrl}/books`, httpOptions)
        .pipe(retry(3), catchError(this.handleError))
    );
  }

  findOne(props: { id: number }) {
    return firstValueFrom(
      this.http
        .get<Book>(`${this.backendUrl}/books/${props.id}`, httpOptions)
        .pipe(retry(3), catchError(this.handleError))
    );
  }

  update(book: any) {
    return firstValueFrom(
      this.http
        .put<Book>(`${this.backendUrl}/books`, book, httpOptions)
        .pipe(retry(3), catchError(this.handleError))
    );
  }

  delete(props: { id: number }) {
    return firstValueFrom(
      this.http
        .delete<any>(`${this.backendUrl}/books/${props.id}`, httpOptions)
        .pipe(retry(3), catchError(this.handleError))
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      return throwError(
        () => new Error('An error ocurred; please try again later')
      );
    }
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    return throwError(() => new Error(error.error.message[0]));
  }
}
