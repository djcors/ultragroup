import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = "/api/"
  httpHeders = new HttpHeaders({
    'Content-type': 'application/json'
  })
  constructor(private http: HttpClient) { }
  getAllHotels(): Observable<any>{
    return this.http.get(
      `${this.baseUrl}hotel/`,
      {headers: this.httpHeders}
    );
  }
}
