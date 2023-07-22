import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmplopyeeService } from 'src/app/services/emplopyee.service';
import { Store } from '@ngrx/store';
import { addEmployee } from '../../../../store/employee/employee.action';
import { Employee } from '../../../../store/employee/employee.model';
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
  department: '';
  errorMessage = '';
  constructor(
    private employeeService: EmplopyeeService,
    private router: Router,
    private store: Store,
  ) {}

  validateDOBFormat(): boolean {
    const dobRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/;
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
    const newEmployee: Employee =  {
      emp_first_name: this.employee.firstName,
      emp_last_name: this.employee.lastName,
      emp_dob: this.employee.DOB,
      emp_salary: +this.employee.salary,
      emp_designation: this.employee.designation,
      emp_status: this.employee.status,
    };

    this.store.dispatch(addEmployee({ employee: newEmployee }));
    addUserForm.resetForm();
  }

  getBack() {
    this.router.navigate(['/dashboard']);
  }
}
