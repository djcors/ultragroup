import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/services.index';
import { BookingModel } from 'src/app/models/booking.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styles: []
})
export class ConfirmComponent implements OnInit {
  booking:BookingModel;
  form:FormGroup;
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
      this.booking = booking
      this.form.patchValue(this.booking)
    })
  }

  onSubmit(){
    
  }

}
