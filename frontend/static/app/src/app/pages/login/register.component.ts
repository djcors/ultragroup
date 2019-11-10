import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agency } from 'src/app/models/agency.models';


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

  constructor(private formBuilder: FormBuilder) { }

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
    console.log(this.form.valid)
      this.submitted = true;
      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }
      let angecy = new Agency(
        this.form.value.username,
        this.form.value.email,
        this.form.value.password
      )
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.form.value, null, 4));
  }

  onReset() {
      this.submitted = false;
      this.form.reset();
  }

}
