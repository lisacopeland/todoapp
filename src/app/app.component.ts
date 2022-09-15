import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserEmail, selectUserLoggedIn } from './auth/+state/auth.reducers';
import { Router } from '@angular/router';
import { checkLoginState, logOutUserAction } from './auth/+state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  email = null;
  constructor(private store: Store, private router: Router) { }

  ngOnInit() {

    this.store.dispatch(checkLoginState({payload: {}}));

    this.store.select(selectUserLoggedIn).subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['/todos']);
      } else {
        this.router.navigate(['/signin']);
      }
    });
    this.store.select(selectUserEmail).subscribe(email => {
      if ((email !== null) && (email !== '')) {
        this.email = email;
      } else {
        this.email = null;
      }
    });
  }

  onSignout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('email');
    localStorage.removeItem('refreshToken');
    this.store.dispatch(logOutUserAction({ payload: {} }));
  }
}


