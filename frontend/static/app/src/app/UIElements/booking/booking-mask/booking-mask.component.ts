import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, BookingMaskService } from 'src/app/services/services.index';

declare var $: any;
@Component({
  selector: 'app-booking-mask',
  templateUrl: './booking-mask.component.html',
  styleUrls: ['./booking-mask.component.scss']
})
export class BookingMaskComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  initialDate: Date = new Date();
  endDate: Date = new Date(
    this.initialDate.getFullYear(),
    this.initialDate.getMonth(),
    this.initialDate.getUTCDate() + 1
  );
  arrival:string;
  deperture:string;
  destinations: Array<string> = [];
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public _bookingMask: BookingMaskService,
    public _apiServices: ApiService
  ) {   }

  ngOnInit() {
    const self = this
    $(document).ready(function(){
      $('.input-daterange-datepicker').daterangepicker({
        minDate: self.initialDate,
        startDate: self.initialDate,
        endDate: self.endDate,
        buttonClasses: ['btn', 'btn-sm'],
        applyClass: 'btn-danger',
        cancelClass: 'btn-inverse',
        autoUpdateInput: true,
      });


      $('.input-daterange-datepicker').on('apply.daterangepicker', function(ev, picker) {
        self.arrival = picker.startDate.format('YYYY-MM-DD')
        self.deperture = picker.endDate.format('YYYY-MM-DD')
      });
    });

    this._apiServices.getAny('destinations').subscribe(destinations => this.destinations = destinations)

    this.form = this.formBuilder.group({
      dates: [null, [Validators.required]],
      pax: [2, Validators.min(1)],
      location: [null, Validators.required]
    });
    this.initValues()
  }
  
  initValues(){
    let arrive = this._bookingMask.param('arrive')
    let deperture = this._bookingMask.param('deperture')
    let location = this._bookingMask.param('location')
    let pax = this._bookingMask.param('pax')

    if(arrive && deperture){
      arrive = new Date(arrive.replace(/-/g, '/'))
      deperture = new Date(deperture.replace(/-/g, '/'))
      $(document).ready(function(){
        $('.input-daterange-datepicker').data('daterangepicker').setStartDate(arrive)
        $('.input-daterange-datepicker').data('daterangepicker').setEndDate(deperture)
      });

      if(location && pax){
        this.form.patchValue({pax:pax, location:location})
      }

    }
  }
    

  get f() { return this.form.controls; }
  onSubmit(){
    this.submitted = true;
    if (!this.arrival || !this.deperture) {
      return;
    }
    this.router.navigateByUrl(
      `/booking/rooms/${this.form.value.location}/${this.arrival}/${this.deperture}/${this.form.value.pax}`
    )
    this.submitted = false;
  }

}
