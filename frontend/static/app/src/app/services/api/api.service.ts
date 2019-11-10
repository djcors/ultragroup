import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agency } from 'src/app/models/agency.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = "http://localhost:8000/api/"
  httpHeders = new HttpHeaders({
    'Content-type': 'application/json'
  })
  constructor(private http: HttpClient) { }

  authLogin(data:any){
    return this.http.post(
      `${this.baseUrl}auth/`,
      data,
      {headers: this.httpHeders})
    .pipe( 
      map( (response:any) => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('agency', JSON.stringify(response.data))
        return true
      })
    )
  }

  signUp(agency:Agency):  Observable<any>{
    return this.http.post(
      `${this.baseUrl}agency/`, 
      agency,
      {headers: this.httpHeders}
    )
  }

  getAllHotels(): Observable<any>{
    return this.http.get(
      `${this.baseUrl}hotel/`,
      {headers: this.httpHeders}
    );
  }
}
