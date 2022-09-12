import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserEmail, selectUserLoggedIn } from './auth/+state/auth.reducers';
import { Router } from '@angular/router';
import { userLoggedOutAction } from './auth/+state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  email = null;
  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    this.store.select(selectUserLoggedIn).subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['/todos']);
      }
    });    
    this.store.select(selectUserEmail).subscribe(email => {
      if (email !== null) {
        this.email = email;
      }
    });
  }

  onSignout() {
    localStorage.removeItem('jwt');
    this.store.dispatch(userLoggedOutAction({ payload: {} }));
  }
}
