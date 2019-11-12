import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room.model';
import { ApiService } from 'src/app/services/services.index';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingModel } from 'src/app/models/booking.models';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styles: []
})
export class BookingRoomsComponent implements OnInit {
  rooms: Room[] = [];
  booking: BookingModel = new BookingModel()
  selectedRoom: Room
  arrive:string
  deperture: string
  total_pax: number
  constructor(
    public _apiServices:ApiService,
    public activateRoute: ActivatedRoute,
    public router: Router
  ) { 
    activateRoute.params.subscribe(params => {
      let data = {
        location: params['location']
      }
      if (data){
        this.searchDispo(this.dictToURI(data))
      }
      this.arrive = params['arrive']
      this.deperture = params['deperture']
      this.total_pax = parseInt(params['pax'])
    })
  }

  ngOnInit() {  
    
  }

  dictToURI(dict) {
    var str = [];
    for(var p in dict){
       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(dict[p]));
    }
    return str.join("&");
  }

  searchDispo(params:string){
    if (params){
      this._apiServices.getAnyWithParams('room', params).subscribe(resp => {
        this.rooms = resp.results
      })
    }
  }

  bookingRoom(id:number){
    this._apiServices.retrieveAny('room', id).subscribe(room =>{
      this.selectedRoom = room
      this.booking.room = this.selectedRoom.id
      this.booking.date = new Date().toLocaleDateString()
      this.booking.arrival = this.arrive
      this.booking.deperture = this.deperture
      this.booking.confirmed = false
      this.booking.total_pax = this.total_pax
      this.booking.base_price = this.selectedRoom.base_price
      this.booking.tax = this.selectedRoom.tax
      this.booking.total_imported = this.selectedRoom.base_price + ( this.selectedRoom.base_price / 100 * this.selectedRoom.tax)
      localStorage.setItem('total_pax', this.total_pax.toString());
      this._apiServices.createAny('booking', this.booking).subscribe(booking =>{
        this.router.navigate(['/booking/pax/', booking.id])
      })
    })
  }

}
