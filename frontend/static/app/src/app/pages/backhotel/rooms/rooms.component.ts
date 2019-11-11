import { Component, OnInit } from '@angular/core';
import { Agency } from 'src/app/models/agency.models';
import { ApiService } from 'src/app/services/services.index';
import Swal from 'sweetalert2'
import { Room } from 'src/app/models/room.model';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styles: []
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  agency: Agency
  constructor(public _apiServices: ApiService) { }
  ngOnInit() {
    this.agency = this._apiServices.agency
    this.getRooms()
  }

  getRooms(){
    this._apiServices.getAllRooms(this.agency.id).subscribe(res=>{
      this.rooms = res.results
    })
  }

  deleteRoom(id:number){
    this._apiServices.deleteAny('room', id).subscribe(
      resp=>{
        Swal.fire({
          icon: 'success',
          title: 'Nice!',
          text: 'Room deleted',
        })
        this.getRooms()
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


}
