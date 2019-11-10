import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agency } from 'src/app/models/agency.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = "http://localhost:8000/api/"
  httpHeders = new HttpHeaders({
    'Content-type': 'application/json'
  })

  agency = null
  token = null

  constructor(
    private http: HttpClient,
    public router: Router
  ) { 
    this.loadStorage()
  }

  loadStorage(){
    if(localStorage.getItem('agency')){
      this.agency = localStorage.getItem('agency')
      this.token = localStorage.getItem('token')
    }
  }

  isLogged(){
    return ((this.agency && this.agency.length > 15) && (this.token && this.token.length > 15))
  }

  logOut(){
    this.agency = null
    this.token = null
    localStorage.clear()
    this.router.navigateByUrl('/')
  }


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
