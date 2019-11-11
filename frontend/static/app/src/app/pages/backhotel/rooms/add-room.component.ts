import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/services.index';
import { Room } from 'src/app/models/room.model';
import { Hotel } from 'src/app/models/hotel.model';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styles: []
})
export class AddRoomComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  hotels: Hotel[] = [];
  room: Room = new Room(null,null,null,null,null,null,null,null,null);
  editView = false
  constructor(
    public router: Router,
    public activateRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public _apiServices: ApiService
  ) {
    activateRoute.params.subscribe(params => {
      let id = params['id']
      if (id){
        this.retriveRoom(id)
        this.editView = true
      }
    })
   }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      room_type: [null, [Validators.required]],
      base_price: [null, [Validators.required]],
      tax: [null, Validators.required],
      hotel: [null, Validators.required],
      location: [null, Validators.required],
      active: [true]
    });

    let agency = this._apiServices.agency
    this._apiServices.getAllHotels(agency.id).subscribe(
      res =>{
        this.hotels = res.results
      }
    )
  }

  retriveRoom(id){
    this._apiServices.retrieveAny('room', id).subscribe(resp =>{
      this.room = resp
      this.form.patchValue(resp)
    })
  }

  get f() { return this.form.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    let newRoom = new Room(
      this.form.value.name,
      this.form.value.code,
      this.form.value.hotel,
      this.form.value.base_price,
      this.form.value.tax,
      this.form.value.active,
      this.form.value.location,
      this.form.value.room_type,
      null
    )
    if(this.editView){
      this._apiServices.updateAny('room', newRoom, this.room.id)
      .subscribe(
        response =>{
          this.showSucces('Room edited')
          this.router.navigateByUrl('/backhotel/rooms')
        },
        error => {
          this.showErrors(error.message)
        }
      );
    } else {
      this._apiServices.createAny('room', newRoom)
      .subscribe(
        response =>{
          this.showSucces('Room added')
          this.router.navigateByUrl('/backhotel/rooms')
        },
        error => {
          this.showErrors(error.message)
        }
      );
    }
    
}

showErrors(message){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
  })
}

showSucces(message){
  Swal.fire({
    icon: 'success',
    title: 'Nice!',
    text: message,
  })
}

}
