// src/app/views/auth-module/auth.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout,loginFailure } from './auth.action';

export interface AuthState {
  error: any;
  user: any;
  isLoggedIn: boolean;

}

export const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  error: undefined
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => {
    console.log('Login success reducer:', user);
    return {
      ...state,
      user,
      isLoggedIn: true,
    };
  }), on(loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    isLoggedIn: false,
    error,
  })),
  on(logout, (state) => {
    console.log('Logout reducer');
    return {
      ...state,
      user: null,
      isLoggedIn: false,
    };
  })
);
