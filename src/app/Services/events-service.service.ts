import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { EventRep } from "../models/eventRep";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
const apiUrl = "http://localhost:3000/api/events";
@Injectable({
  providedIn: "root"
})
export class EventService {
  constructor(private http: HttpClient) {}
  getEvents(): Observable<EventRep[]> {
    return this.http.get<EventRep[]>(apiUrl).pipe(
      tap(events => console.log("fetched Events")),
      catchError(this.handleError("getEvents", []))
    );
  }
  getUserevents(userId): Observable<EventRep[]> {
    const url = `${apiUrl}/userid/${userId}`;

    return this.http.get<EventRep[]>(url).pipe(
      tap(events => console.log("fetched Events")),
      catchError(this.handleError("getMyevents", []))
    );
  }
  getEvent(id: number): Observable<EventRep> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<EventRep>(url).pipe(
      tap(_ => console.log(`fetched Event id=${id}`)),
      catchError(this.handleError<EventRep>(`getEvent id=${id}`))
    );
  }

  addEvent(event): Observable<EventRep> {
    return this.http.post<EventRep>(apiUrl, event, httpOptions).pipe(
      tap((event: EventRep) => console.log(`added Event w/ id=${event._id}`)),
      catchError(this.handleError<EventRep>("addEvent"))
    );
  }

  updateEvent(id, event): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, event, httpOptions).pipe(
      tap(_ => console.log(`updated Event id=${id}`)),
      catchError(this.handleError<any>("updateEvent"))
    );
  }

  deleteEvent(id): Observable<Event> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Event>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Event id=${id}`)),
      catchError(this.handleError<Event>("deleteEvent"))
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
