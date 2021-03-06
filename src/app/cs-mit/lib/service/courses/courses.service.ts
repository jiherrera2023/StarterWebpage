import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Course } from './courses.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  courseInfoSubject: Subject<Course> = new Subject<Course>();
  pickedCoursesSubject: Subject<Array<Course>> = new Subject<Array<Course>>();

  constraintFinishedRenderingSubject: Subject<any> = new Subject<any>();
  groupStatsFinishedRenderingSubject: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {}

  getScrapedInfo(): Observable<Object> {
    let url = 'assets/data/api-data.json';
    return this.http.get(url)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
