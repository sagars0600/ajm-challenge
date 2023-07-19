import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { EmployeeListComponent } from './views/employee-list/employee-list.component';
import { AddEmployeeComponent } from './views/add-employee/add-employee.component';
import { EditEmployeeComponent } from './views/edit-employee/edit-employee.component';
import { ViewEmployeeComponent } from './views/view-employee/view-employee.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'dashboard', component: EmployeeListComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'edit-employee/:id', component: EditEmployeeComponent },
  { path: 'view-employee/:id', component: ViewEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
