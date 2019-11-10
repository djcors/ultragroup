import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public _apiServices: ApiService,
    public router: Router
  ){}

  canActivate(){
    if(this._apiServices.isLogged()){
      return true
    } else {
      this.router.navigateByUrl('/login')
      return false
    }
  }
}
