//----------------------------------------------------------------------------
// Imports Section
//----------------------------------------------------------------------------
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService<T> {
  constructor(private http: HttpClient) {}

  //------------------------------------------------------------------------
  // Public Methods Section
  //------------------------------------------------------------------------
  get(url: string, options?: { params?: HttpParams }): Observable<T> {
    return this.http.get<T>(url, { ...options, observe: 'body' });
  }
  //------------------------------------------------------------------------
  post(url: string, data: T): Observable<T> {
    return this.http.post<T>(url, data, {
      headers: {
          'Content-Type': 'application/json',
      },
  });
  }
  //------------------------------------------------------------------------
  put(url: string, data: T): Observable<T> {
    return this.http.put<T>(url, data,{
      headers: {
          'Content-Type': 'application/json',
      },
  });
  }
  //------------------------------------------------------------------------
  delete(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
