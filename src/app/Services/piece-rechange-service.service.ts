import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { PieceRechange } from "../models/pieceRechange";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
const apiUrl = "http://localhost:3000/api/pieceRechanges";
@Injectable({
  providedIn: "root"
})
export class PieceRechangeServiceService {
  constructor(private http: HttpClient) {}
  getPieceRechanges(): Observable<PieceRechange[]> {
    return this.http.get<PieceRechange[]>(apiUrl).pipe(
      tap(pieceRechanges => console.log("fetched PieceRechanges")),
      catchError(this.handleError("getPieceRechanges", []))
    );
  }
 
  getPieceRechange(id: number): Observable<PieceRechange> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<PieceRechange>(url).pipe(
      tap(_ => console.log(`fetched PieceRechange id=${id}`)),
      catchError(this.handleError<PieceRechange>(`getPieceRechange id=${id}`))
    );
  }

  addPieceRechange(pieceRechange): Observable<PieceRechange> {
    return this.http
      .post<PieceRechange>(apiUrl, pieceRechange, httpOptions)
      .pipe(
        tap((pieceRechange: PieceRechange) =>
          console.log(`added PieceRechange w/ id=${pieceRechange._id}`)
        ),
        catchError(this.handleError<PieceRechange>("addPieceRechange"))
      );
  }

  updatePieceRechange(id, pieceRechange): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, pieceRechange, httpOptions).pipe(
      tap(_ => console.log(`updated pieceRechange id=${id}`)),
      catchError(this.handleError<any>("updatePieceRechange"))
    );
  }

  deletePieceRechange(id): Observable<PieceRechange> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<PieceRechange>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted PieceRechange id=${id}`)),
      catchError(this.handleError<PieceRechange>("deletePieceRechange"))
    );
  }
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
