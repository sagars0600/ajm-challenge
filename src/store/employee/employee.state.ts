import { Employee } from './employee.model';

export interface EmployeeState {
  employees: Employee[];
  selectedEmployeeId: number | null;
}

export const initialEmployeeState: EmployeeState = {
  employees: [],
  selectedEmployeeId: null,
};
