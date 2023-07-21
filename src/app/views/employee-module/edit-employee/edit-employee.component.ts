import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmplopyeeService } from 'src/app/services/emplopyee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit {
  todayDate = new Date();
  employee = {
    firstName: '',
    status: '',
    salary: '',
    designation: '',
    DOB: '',
    lastName: '',
  };
  id: any;
  showDate: any;
  constructor(
    private employeeService: EmplopyeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.showEmployeeById(params['id']);
    });
  }

  validateDOBFormat(): boolean {
    const dobRegex = /^\d{2}-\d{2}-\d{4}$/;
    const value = this.employee.DOB;
    return dobRegex.test(value);
  }

  showEmployeeById(id: any) {
    this.id = id;
    this.employeeService.getEmployeeById(this.id).subscribe((data: any) => {
      this.employee.firstName = data.responseData.emp_first_name;
      (this.employee.lastName = data.responseData.emp_last_name),
      (this.employee.DOB = data.responseData.emp_dob),
      (this.employee.salary = data.responseData.emp_salary),
      (this.employee.designation = data.responseData.emp_designation),
      (this.employee.status = data.responseData.emp_status);
    });
  }

  submitForm(addUserForm: any) {
    if (
      !this.employee.firstName ||
      !this.employee.lastName ||
      !this.employee.DOB ||
      !this.employee.salary ||
      !this.employee.designation ||
      !this.employee.status ||
      !this.validateDOBFormat()
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
    this.employeeService.updateEmployee(body, this.id).subscribe(
      (data: any) => {
        this.router.navigate(['/dashboard']);

      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  getBack() {
    this.router.navigate(['/dashboard']);
  }
}
