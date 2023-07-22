import { createReducer, on } from '@ngrx/store';
import {
  loadEmployeesSuccess,
  selectEmployee,
  addEmployee,
  editEmployee,
} from './employee.action';
import { EmployeeState, initialEmployeeState } from './employee.state';

export const employeeReducer = createReducer(
  initialEmployeeState,
  on(loadEmployeesSuccess, (state, { employees }) => ({ ...state, employees })),
  on(selectEmployee, (state, { employeeId }) => ({
    ...state,
    selectedEmployeeId: employeeId,
  })),
  on(addEmployee, (state, { employee }) => ({
    ...state,
    employees: [...state.employees, employee],
  })),

);
