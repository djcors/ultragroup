import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/services.index';
import { BookingModel } from 'src/app/models/booking.models';
import { Agency } from 'src/app/models/agency.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  bookings: BookingModel[] = []
  agency:Agency
  dashboard:any
  constructor(
    public _apiServices:ApiService,
  ) { }

  ngOnInit() {
    this.agency = this._apiServices.agency
    this.getDashboard()
    this.getBookings()
  } 

  getDashboard(){
    this._apiServices.getAny('dashboard').subscribe(resp =>{
      this.dashboard = resp
    })
  }

  getBookings(){
    let params = `room__hotel__agency=${this.agency.id}`
    this._apiServices.getAnyWithParams('booking', params).subscribe(resp =>{
      this.bookings = resp.results
    })
  }

}
