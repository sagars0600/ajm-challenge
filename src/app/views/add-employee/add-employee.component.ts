import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmplopyeeService } from 'src/app/services/emplopyee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent {
  todayDate = new Date();
  employee = {
    firstName: '',
    status: '',
    salary: '',
    designation: '',
    DOB: '',
    lastName: '',
  };
  constructor(
    private employeeService: EmplopyeeService,
    private router: Router
  ) {}

  validateDOBFormat(): boolean {
    const dobRegex = /^\d{2}-\d{2}-\d{4}$/;
    const value = this.employee.DOB;
    return dobRegex.test(value);
  }

  submitForm(addUserForm: any) {
    if (
      !this.validateDOBFormat() ||
      !this.employee.firstName ||
      !this.employee.lastName ||
      !this.employee.DOB ||
      !this.employee.salary ||
      !this.employee.designation ||
      !this.employee.status
    ) {
      return;
    }
    let body = {
      emp_first_name: this.employee.firstName,
      emp_last_name: this.employee.lastName,
      emp_dob: this.employee.DOB,
      emp_salary: this.employee.salary,
      emp_designation: this.employee.designation,
      emp_status: this.employee.status,
    };

    this.employeeService.addEmployee(body).subscribe(
      (data: any) => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  getBack() {
    this.router.navigate(['/dashboard']);
  }
}
