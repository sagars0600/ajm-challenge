import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmplopyeeService } from 'src/app/services/emplopyee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit{

  public lists:any
  constructor(private employeeService : EmplopyeeService, private router:Router){}
  ngOnInit(): void {
   this.getAllEmployees();
  }

  getAllEmployees(){
    this.employeeService.getEmployeeList().subscribe((data:any) =>{
      this.lists = data.responseData;
    })
  }

  deleteEmployee(id:any){
    this.employeeService.deleteEmployee(id).subscribe((data:any) =>{
      this.getAllEmployees();
    })
  }

  addEmployee(){
    this.router.navigate(['/add-employee'])
  }
}
