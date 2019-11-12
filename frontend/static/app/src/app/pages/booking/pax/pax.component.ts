import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/services.index';
import { BookingModel } from 'src/app/models/booking.models';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pax',
  templateUrl: './pax.component.html',
  styleUrls: ['./pax.component.scss']
})
export class PaxComponent implements OnInit {
  booking: BookingModel;
  bookingId:number;
  form: FormGroup;
  paxNumber:number;
  submitted = false
  constructor(
    public _apiServices: ApiService,
    public activeRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public router: Router
  ) {
    this.activeRoute.params.subscribe(params => {
      this.bookingId = parseInt(params['booking'])
    })
  }

  ngOnInit() {
    this.getBooking()
    if(!localStorage.getItem('pax_counter')){
      localStorage.setItem('pax_counter', "0")
    }
    this.paxNumber = parseInt(localStorage.getItem('pax_counter')) + 1
    this.createForms()
  }

  createForms(){
    this.form = this.formBuilder.group({
      booking: [null],
      full_name: [null, [Validators.required]],
      born_date: [null, [Validators.required]],
      genre: [null, [Validators.required]],
      doc_type: [null, Validators.required],
      doc_number: [null, Validators.required],
      email: [null, Validators.email],
      telephone: [null, Validators.required]
    });
  }

  getBooking(){
    this._apiServices.retrieveAny('booking', this.bookingId).subscribe(booking => {
      this.booking = booking
    })
  }

  get f() { return this.form.controls; }
  onSubmit(){
    this.form.patchValue({booking: this.booking.id})
    this.submitted = true
    if(this.form.invalid){
      return
    }
    console.log(this.form.value, this.paxNumber)
    
    this._apiServices.createAny('pax', this.form.value)
      .subscribe(
        response =>{
          let total_pax = parseInt(localStorage.getItem('total_pax'))
          if (this.paxNumber == total_pax){
            this.router.navigate(['/booking/confirm/', this.booking.id])
          } else {
            this.submitted = true
            this.form.reset()
            this.paxNumber++
            localStorage.setItem('pax_counter', this.paxNumber.toString())
          }
          
        },
        error => {
          
        }
      );
      

  }

}
