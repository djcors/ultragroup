import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/services.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(public _apiServices: ApiService) { }

  ngOnInit() {
  }

}
