import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './views/employee-module/employee-list/employee-list.component';
import { AddEmployeeComponent } from './views/employee-module/add-employee/add-employee.component';
import { EditEmployeeComponent } from './views/employee-module/edit-employee/edit-employee.component';
import { ViewEmployeeComponent } from './views/employee-module/view-employee/view-employee.component';



@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    ViewEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
