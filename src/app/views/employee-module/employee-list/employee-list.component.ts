import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmplopyeeService } from 'src/app/services/emplopyee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  public lists: any;
  constructor(
    private employeeService: EmplopyeeService,
    private router: Router,
    private authService: AuthService
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
    this.authService.logout().subscribe((data: any) => {
      this.router.navigate(['']);
    });
  }
}
