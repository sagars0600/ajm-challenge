import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmplopyeeService } from 'src/app/services/emplopyee.service';
import { Store } from '@ngrx/store';
import { login, logout } from '../../auth-module/auth.action';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  public lists: any;
  logoutError: string | null = null;
  constructor(
    private employeeService: EmplopyeeService,
    private router: Router,
    private authService: AuthService,
    private store: Store
  ) {}
  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getEmployeeList().subscribe((data: any) => {
      this.lists = data.responseData;
    });
  }

  deleteEmployee(id: any) {
    this.employeeService.deleteEmployee(id).subscribe((data: any) => {
      this.getAllEmployees();
    });
  }

  addEmployee() {
    this.router.navigate(['/add-employee']);
  }

  logOut() {
    this.store.dispatch(logout());
  }
}
