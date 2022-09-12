import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { signupUserAction } from 'src/app/auth/+state/auth.actions';
import { selectAuthError } from '../+state/auth.reducers';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  errorMessage: string;
  form: FormGroup;
  constructor(public fb: FormBuilder, private store: Store, private router: Router) { }

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
    this.store.dispatch(signupUserAction({ payload: { email: this.form.value.email, password: this.form.value.password } }))
  }
}
