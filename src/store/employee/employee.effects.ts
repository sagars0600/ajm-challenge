import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import {
  loadEmployees,
  loadEmployeesSuccess,
  loadEmployeesFailure,
  addEmployee,
} from './employee.action';
import { EmplopyeeService } from 'src/app/services/emplopyee.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class EmployeeEffects {
  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEmployees),
      switchMap(() => {
        console.log('Load employees action caught by the effect');
        return this.employeeService.getEmployeeList().pipe(
          map((employees: any) => {
            console.log('API response:', employees);
            return loadEmployeesSuccess({ employees });
          }),
          catchError((error: any) => {
            console.error('API error:', error);
            return of(loadEmployeesFailure({ error }));
          })
        );
      })
    )
  );
  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addEmployee),
      switchMap((action) =>
        this.employeeService.addEmployee(action.employee).pipe(
          map((employee: any) => {
            this.router.navigate(['/dashboard']);
            console.log('Added employee:', employee);
            return loadEmployees();
          }),
          catchError((error: any) => {
            console.error('Add employee error:', error);
            return of({ type: 'ADD_EMPLOYEE_ERROR', payload: error });
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private employeeService: EmplopyeeService,
    private router: Router
  ) {}
}
