import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/services.index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  constructor(
    public formBuilder: FormBuilder,
    public _apiServices: ApiService
    ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(8)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.form.controls; }
  onSubmit() {
      this.submitted = true;
      if (this.form.invalid) {
          return;
      }
      //let data = sJSON.stringify(this.form.value, null, 4)
      //this._apiServices.authLogin(data)
  }

}
