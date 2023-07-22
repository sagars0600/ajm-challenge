import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { AuthModuleModule } from './views/auth-module/auth-module.module';
import { EmployeeModuleModule } from './views/employee-module/employee-module.module';
import { AuthEffects } from '../store/auth/auth.effects';
import { authReducer } from '../store/auth/auth.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { employeeReducer } from './../store/employee/employee.reducer';
import { EmployeeEffects } from './../store/employee/employee.effects';
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
    EmployeeModuleModule,
    StoreModule.forRoot({ auth: authReducer }),
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forFeature('employee', employeeReducer),
     EffectsModule.forFeature([EmployeeEffects]),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
