import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  getEmployeeList() {
    return this.http.get(this.environmentUrl + '/employees', this.httpOptions);
  }

  getEmployeeById(id: any) {
    return this.http.get(
      this.environmentUrl + `/employees/${id}`,
      this.httpOptions
    );
  }

  addEmployee(body: any) {
    return this.http.post(
      this.environmentUrl + '/employees',
      body,
      this.httpOptions
    );
  }

  updateEmployee(body: any, id: any) {
    return this.http.put(
      this.environmentUrl + `/employees/${id}`,
      body,
      this.httpOptions
    );
  }

  deleteEmployee(id: any) {
    return this.http.delete(
      this.environmentUrl + `/employees/${id}`,
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

    return this.http.post(this.environmentUrl + url, formData, { headers });
  }

  getDocumentById(id: any) {
    return this.http.get(
      this.environmentUrl + `/employees/${id}/documents`,
      this.httpOptionData
    );
  }

  deleteDocuments(empId: any, docId: any) {
    return this.http.delete(
      this.environmentUrl + `/employees/${empId}/documents/${docId}`,
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

    return this.http.put(this.environmentUrl + url, formData, { headers });
  }

  getDocumentByEmployeeId(empId: any, docId: any) {
    return this.http.get(
      this.environmentUrl + `/employees/${empId}/documents/${docId}`,
      this.httpOptions
    );
  }

  searchEmployee(body: any) {
    return this.http.post(
      this.environmentUrl + '/employees/search',
      body,
      this.httpOptions
    );
  }
}