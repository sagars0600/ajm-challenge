import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Employee } from '../../store/employee/employee.model';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class EmplopyeeService {
  httpOptions: any;
  httpOptionData: any;
  environmentUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.httpOptionData = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      }),
    };
  }

  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(environment.apiUrl + '/employees');
  }

  getEmployeeById(id: any) {
    return this.http.get(
      environment.apiUrl + `/employees/${id}`,
      this.httpOptions
    );
  }

  addEmployee(body: any): Observable<Employee> {
    return this.http.post<Employee>(environment.apiUrl + '/employees', body, this.httpOptions)
      .pipe(
        map((response: any) => {
          // Assuming the API response contains the created employee data,
          // you might need to adjust this based on your API response structure
          return response as Employee;
        })
      );
  }
  updateEmployee(body: any, id: any) {
    return this.http.put(
      environment.apiUrl + `/employees/${id}`,
      body,
      this.httpOptions
    );
  }

  deleteEmployee(id: any) {
    return this.http.delete(
      environment.apiUrl + `/employees/${id}`,
      this.httpOptions
    );
  }

  addDocument(employeeId: number, docName: string, docImage: File) {
    const formData = new FormData();
    formData.append('doc_name', docName);
    formData.append('doc_image', docImage);

    const url = `/employees/${employeeId}/documents`;

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(environment.apiUrl + url, formData, { headers });
  }

  getDocumentById(id: any) {
    return this.http.get(
      environment.apiUrl + `/employees/${id}/documents`,
      this.httpOptionData
    );
  }

  deleteDocuments(empId: any, docId: any) {
    return this.http.delete(
      environment.apiUrl + `/employees/${empId}/documents/${docId}`,
      this.httpOptions
    );
  }

  updateDocumentById(
    employeeId: number,
    docId: number,
    docName: string,
    docImage: File
  ) {
    const formData = new FormData();
    formData.append('doc_name', docName);
    formData.append('doc_image', docImage);

    const url = `/employees/${employeeId}/documents/${docId}`;

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.put(environment.apiUrl + url, formData, { headers });
  }

  getDocumentByEmployeeId(empId: any, docId: any) {
    return this.http.get(
      environment.apiUrl + `/employees/${empId}/documents/${docId}`,
      this.httpOptions
    );
  }

  searchEmployee(body: any) {
    return this.http.post(
      environment.apiUrl + '/employees/search',
      body,
      this.httpOptions
    );
  }
}
