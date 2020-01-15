import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { Voiture } from "../models/voiture";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
const apiUrl = "http://localhost:3000/api/vehicules";
@Injectable({
  providedIn: "root"
})
export class VoitureService {
  constructor(private http: HttpClient) {}
  getVoitures(): Observable<Voiture[]> {
    return this.http.get<Voiture[]>(apiUrl).pipe(
      tap(voitures => console.log("fetched Voitures")),
      catchError(this.handleError("getVoitures", []))
    );
  }
  getUserVoitures(userId): Observable<Voiture[]> {
    const url = `${apiUrl}/userid/${userId}`;

    return this.http.get<Voiture[]>(url).pipe(
      tap(voitures => console.log("fetched Voitures")),
      catchError(this.handleError("getMyVoitures", []))
    );
  }

  getVoiture(id: number): Observable<Voiture> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Voiture>(url).pipe(
      tap(_ => console.log(`fetched Voiture id=${id}`)),
      catchError(this.handleError<Voiture>(`getVoiture id=${id}`))
    );
  }

  addVoiture(voiture): Observable<Voiture> {
    return this.http.post<Voiture>(apiUrl, voiture, httpOptions).pipe(
      tap((voiture: Voiture) =>
        console.log(`added Voiture w/ id=${voiture._id}`)
      ),
      catchError(this.handleError<Voiture>("addVoiture"))
    );
  }

  updateVoiture(id, voiture): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, voiture, httpOptions).pipe(
      tap(_ => console.log(`updated voiture id=${id}`)),
      catchError(this.handleError<any>("updateVoiture"))
    );
  }

  deleteVoiture(id): Observable<Voiture> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Voiture>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Voiture id=${id}`)),
      catchError(this.handleError<Voiture>("deleteVoiture"))
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
