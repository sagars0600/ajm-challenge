import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModuleModule } from './views/auth-module/auth-module.module';
import { EmployeeModuleModule } from './views/employee-module/employee-module.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AuthModuleModule,
    EmployeeModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
