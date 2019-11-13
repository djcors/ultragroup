import { Component, OnInit } from '@angular/core';
import { BookingModel } from 'src/app/models/booking.models';
import { Room } from 'src/app/models/room.model';
import { PaxModel } from 'src/app/models/pax.models';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/services.index';
import { Agency } from 'src/app/models/agency.models';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styles: []
})
export class InvoiceComponent implements OnInit {
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
    document.body.classList.add('single-column');
    document.body.classList.remove('fix-header');
  }

  getBooking(id:number){
    this._apiServices.retrieveAny('booking', id).subscribe(booking =>{
      this.booking = booking;
      this.getRoom(this.booking.room);
      this.getPax(this.booking.id)
      let arrival:any = new Date(this.booking.arrival);
      let deperture:any = new Date(this.booking.deperture);
      let differenceTime = Math.abs(deperture - arrival);
      this.nights = Math.ceil(differenceTime / (1000 * 60 * 60 * 24)); 
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

  onPrint(){
    window.print();
}


}
