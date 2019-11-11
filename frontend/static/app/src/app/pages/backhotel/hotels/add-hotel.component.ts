import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/services.index';
import { Hotel } from 'src/app/models/hotel.model';
import Swal from 'sweetalert2'
import { Agency } from 'src/app/models/agency.models';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styles: []
})
export class AddHotelComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  hotel = new Hotel(null, null, null, null, null);
  editView = false
  agency:Agency;
  constructor(
    public router: Router,
    public activateRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public _apiServices: ApiService
  ) {
    activateRoute.params.subscribe(params => {
      let id = params['id']
      if (id){
        this.retrieveHotel(id)
        this.editView = true
      }
    })
  }

  ngOnInit() {
    this.agency = this._apiServices.agency
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      agency: [this.agency.id, Validators.required],
      category: [null, Validators.required],
      active: [true]
    });
  }

  retrieveHotel(id){
    this._apiServices.retrieveAny('hotel', id).subscribe(resp =>{
      this.hotel = resp
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
    let newHotel = new Hotel(
      this.form.value.name,
      this.form.value.code,
      this.agency.id,
      this.form.value.category,
      this.form.value.active,
      null
    )
    if(this.editView){
      this._apiServices.updateAny('hotel', newHotel, this.hotel.id)
      .subscribe(
        response =>{
          this.showSucces('Hotel edited')
          this.router.navigate(['/backhotel/hotels'])
        },
        error => {
          this.showErrors(error.message)
        }
      );
    } else {
      this._apiServices.createAny('hotel', newHotel)
      .subscribe(
        response =>{
          this.showSucces('Hotel added')
          this.router.navigate(['/backhotel/hotels'])
        },
        error => {
          this.showErrors(error.message)
        }
      );
    }
  };

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
