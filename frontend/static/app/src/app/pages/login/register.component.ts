import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { Agency } from 'src/app/models/agency.models';
import { ApiService } from 'src/app/services/services.index';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  matchFields(field1:string, field2:string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[field1];
      const matchingControl = formGroup.controls[field2];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
  }

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public _apiServices: ApiService
    ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(8)]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      password2: [null, [Validators.required, Validators.minLength(6)]],
      active: [true]
    },
    {
      validators: this.matchFields('password', 'password2')
    });

  }

  get f() { return this.form.controls; }
  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }
      let agency = new Agency(
        this.form.value.username,
        this.form.value.email,
        this.form.value.password
      )
      this._apiServices.signUp(agency)
        .subscribe(
          response =>{
            Swal.fire({
              icon: 'success',
              title: 'Nice!',
              text: 'Successful sign Up',
            })
            this.router.navigateByUrl('/login')
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.error.results,
            })
          }
        );
  }

  onReset() {
      this.submitted = false;
      this.form.reset();
  }

}
