import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: any;
  password: any;

  constructor(private router: Router) {}

  login() {
    if (this.email === 'admin123@gmail.com' && this.password === 'admin') {
      this.router.navigate(['/dashboard']);
    } else if (
      this.email !== 'admin123@gmail.com' &&
      this.password !== 'admin'
    ) {
      alert('Invalid Email & password');
    }
  }
}
