// src/app/views/auth-module/auth.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { login, loginSuccess, loginFailure, logout, logoutSuccess } from './auth.action';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((loggedIn) => {
            if (loggedIn) {
              this.router.navigate(['/dashboard']);
              return loginSuccess({ user: email });
            } else {
              return loginFailure({ error: 'Invalid Email & password' });
            }
          }),
          catchError((error) => of(loginFailure({ error: 'Invalid Email or password! Please Try again' })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => {
        this.authService.logout().subscribe(() => {
          this.router.navigate(['']);
        });
      }),
      map(() => logoutSuccess())
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
