import { Component, OnInit } from '@angular/core';
import { BookingModel } from 'src/app/models/booking.models';
import { Room } from 'src/app/models/room.model';
import { PaxModel } from 'src/app/models/pax.models';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/services.index';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styles: []
})
export class BookingsComponent implements OnInit {
  booking:BookingModel;
  room:Room;
  pax:PaxModel[] = [];
  nights:number;
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public _apiServices: ApiService,
  ) {
    this.activeRoute.params.subscribe(params => {
      let id = parseInt(params['booking'])
      this.getBooking(id)
    })
  }

  ngOnInit() {
  }

  getBooking(id:number){
    this._apiServices.retrieveAny('booking', id).subscribe(booking =>{
      this.booking = booking;
      this.getRoom(this.booking.room);
      this.getPax(this.booking.id)
    })
  }

  getRoom(id:number){
    this._apiServices.retrieveAny('room', id).subscribe(room =>{
      this.room = room
    })
  }

  getPax(id:number){
    let params = `booking=${id}`
    this._apiServices.getAnyWithParams('pax', params).subscribe(resp =>{
      this.pax = resp.results
    })
  }
}
