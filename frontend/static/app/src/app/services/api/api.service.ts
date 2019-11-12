import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agency } from 'src/app/models/agency.models';
import { Router } from '@angular/router';
import { Room } from 'src/app/models/room.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = "http://localhost:8000/api/"
  httpHeders = new HttpHeaders({
    'Content-type': 'application/json'
  })

  agency:Agency
  token = null

  constructor(
    private http: HttpClient,
    public router: Router
  ) { 
    this.loadStorage()
  }

  loadStorage(){
    if(localStorage.getItem('agency')){
      this.agency = JSON.parse(localStorage.getItem('agency'))
      this.token = localStorage.getItem('token')
    }

    if(this.isLogged()){
      this.httpHeders = new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Token ${this.token}`
      })
    }
  }

  isLogged(){
    return (this.agency && (this.token && this.token.length > 15))
  }

  saveStorage(agency:Agency, token:string){
    localStorage.setItem('token', token)
    localStorage.setItem('agency', JSON.stringify(agency))
    this.agency = agency
    return true
  }

  logOut(){
    this.agency = null
    this.token = null
    localStorage.clear()
    this.router.navigateByUrl('/')
  }


  authLogin(agency:Agency){
    return this.http.post(
      `${this.baseUrl}auth/`,
      agency,
      {headers: this.httpHeders})
    .pipe( 
      map( (response:any) => {
        let agency = new Agency(
          response.data.username,
          response.data.email,
          null,
          response.data.id,
          response.data.token
        )
        return this.saveStorage(agency, response.data.token)
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

  getAllHotels(id:number): Observable<any>{
    let url = 'hotel'
    if(id){
      url = `${url}/?agency=${id}`
    }
    return this.http.get(
      `${this.baseUrl}${url}`,
      {headers: this.httpHeders}
    );
  }

  getAllRooms(id:number): Observable<any>{
    let url = 'room'
    if(id){
      url = `${url}/?hotel__agency=${id}`
    }
    return this.http.get(
      `${this.baseUrl}${url}`,
      {headers: this.httpHeders}
    );
  }

  getAny(endpoint:string): Observable<any>{
    return this.http.get(
      `${this.baseUrl}${endpoint}/`,
      {headers: this.httpHeders}
    );
  }

  getAnyWithParams(endpoint:string, params:string): Observable<any>{
    return this.http.get(
      `${this.baseUrl}${endpoint}/?${params}`,
      {headers: this.httpHeders}
    );
  }

  deleteAny(endpoint:string, id:number): Observable<any>{
    return this.http.delete(
      `${this.baseUrl}${endpoint}/${id}/`,
      {headers: this.httpHeders}
    );
  }

  createAny(endpoint, object:any): Observable<any>{
    return this.http.post(
      `${this.baseUrl}${endpoint}/`,
      object,
      {headers: this.httpHeders}
    )
  }
  
  updateAny(endpoint, object:any, id:number): Observable<any>{
    return this.http.patch(
      `${this.baseUrl}${endpoint}/${id}/`,
      object,
      {headers: this.httpHeders}
    )
  }

  retrieveAny(endpoint:string, id:number): Observable<any>{
    return this.http.get(
      `${this.baseUrl}${endpoint}/${id}/`,
      {headers: this.httpHeders}
    )
  }
}
