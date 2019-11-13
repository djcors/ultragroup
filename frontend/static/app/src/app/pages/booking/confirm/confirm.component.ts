import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/services.index';
import { BookingModel } from 'src/app/models/booking.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Room } from 'src/app/models/room.model';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  booking:BookingModel;
  room:Room;
  form:FormGroup;
  nights:number;
  submitted = false
  arrivalString:string;
  depertureString:string;
  constructor(
    public router: Router,
    public activateRoute: ActivatedRoute,
    public _apiServices: ApiService,
    public formBuilder: FormBuilder,
  ) {
    this.activateRoute.params.subscribe(params => {
      let id = params['booking']
      this.getBooking(id)
    })
  }

  ngOnInit() {
    localStorage.removeItem('total_pax')
    localStorage.removeItem('pax_counter')
    this.createForms()
  }

  createForms(){
    this.form = this.formBuilder.group({
      room: [null],
      emergency_name: [null, [Validators.required]],
      emergency_phone: [null, [Validators.required]],
      tax: [null, [Validators.required]],
      base_price: [null, Validators.required],
      total_imported: [null, Validators.required],
      confirmed: [true],
      date: [null, Validators.required],
      total_pax: [null],
      arrival:[null],
      deperture: [null],
      id:[null]
    });
  }

  getBooking(id:number){
    this._apiServices.retrieveAny('booking', id).subscribe(booking =>{
      this.booking = booking;
      this.getRoom(this.booking.room);
      let arrival:any = new Date(this.booking.arrival);
      let deperture:any = new Date(this.booking.deperture);
      let differenceTime = Math.abs(deperture - arrival);
      this.nights = Math.ceil(differenceTime / (1000 * 60 * 60 * 24)); 
      let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      this.arrivalString = arrival.toLocaleDateString('en-US', dateOptions);
      this.depertureString = deperture.toLocaleDateString('en-US', dateOptions);
      this.form.patchValue(this.booking);
    })
  }

  getRoom(id:number){
    this._apiServices.retrieveAny('room', id).subscribe(room =>{
      this.room = room
    })
  }

  get f() { return this.form.controls; }
  onSubmit(){
    this.submitted = true
    if(this.form.invalid){
      return;
    }
    this.booking.confirmed = true
    this.booking.emergency_name = this.form.value.emergency_name
    this.booking.emergency_phone = this.form.value.emergency_phone
    this._apiServices.updateAny('booking', this.booking, this.booking.id).subscribe(resp =>{
      this.router.navigate(['/invoice', this.booking.id])
    })
  }

  onCancel(){
    this._apiServices.deleteAny('booking', this.booking.id).subscribe(resp =>{
      this.router.navigateByUrl('/')
    })
  }

}
