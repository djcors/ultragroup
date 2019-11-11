import { Component, OnInit } from '@angular/core';
import {  ApiService } from 'src/app/services/services.index';
import { Agency } from 'src/app/models/agency.models';
import Swal from 'sweetalert2'
import { Hotel } from 'src/app/models/hotel.model';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styles: []
})
export class HotelsComponent implements OnInit {
  hotels: Hotel[] = [];
  agency: Agency
  constructor(public _apiServices: ApiService) { }
  ngOnInit() {
    this.agency = this._apiServices.agency
    this.getHotels()
    
  }

  getHotels(){
    this._apiServices.getAllHotels(this.agency.id).subscribe(res=>{
      this.hotels= res.results
    })
  }

  deleteHotel(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "If you delete this hotel you will also delete the rooms associated with it",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this._apiServices.deleteAny('hotel', id).subscribe(
          resp=>{
            Swal.fire({
              icon: 'success',
              title: 'Nice!',
              text: 'Room deleted',
            })
            this.getHotels()
          },
          error =>{
            console.log(error)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.message,
            })
          }
        )
      }
    })
  }
}
