import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly EMAIL_KEY = 'email';
  private readonly PASSWORD_KEY = 'password';

  login(email: string, password: string): boolean {
    if (email === 'admin123@gmail.com' && password === 'admin') {
      localStorage.setItem(this.EMAIL_KEY, email);
      localStorage.setItem(this.PASSWORD_KEY, password);
      return true;
    } else {
      return false;
    }
  }

  logout(): Observable<any> {
    localStorage.removeItem(this.EMAIL_KEY);
    localStorage.removeItem(this.PASSWORD_KEY);
    return of(true); // Return a simple observable that emits true when logout is completed.
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.EMAIL_KEY) && !!localStorage.getItem(this.PASSWORD_KEY);
  }
}
