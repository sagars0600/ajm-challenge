import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { login } from '../auth.action';
import { AppState } from '../../../app-state-model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: any;
  password: any;

  loginError: string | null = null; // Add a variable to hold the login error message

  constructor(private store: Store<AppState>, private router: Router) {}

  login() {
    this.store.dispatch(login({ email: this.email, password: this.password }));
    this.store.pipe(select((state: AppState) => state.auth)).subscribe((authState:any) => {
      if (authState.isLoggedIn) {
        this.router.navigate(['/dashboard']);
      } else if (authState.error) {
        this.loginError = authState.error;
      }
    });
  }
}
