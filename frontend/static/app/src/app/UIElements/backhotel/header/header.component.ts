import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/services.index';
import { Agency } from 'src/app/models/agency.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  agency: Agency
  constructor(public _apiServices: ApiService) { }

  ngOnInit() {
    this.agency = this._apiServices.agency
  }

}
