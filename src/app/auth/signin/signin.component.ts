import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginAction } from 'src/app/auth/+state/auth.actions';
import { selectAuthError } from '../+state/auth.reducers';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  form: FormGroup;
  errorMessage: string;
  constructor(public fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.store.select(selectAuthError).subscribe(error => {
      if (error) {
        this.errorMessage = error;
      }
    });

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })      
  }

  onSubmit() {
    this.store.dispatch(loginAction({ payload: { email: this.form.value.email, password: this.form.value.password } }))
  }

}
