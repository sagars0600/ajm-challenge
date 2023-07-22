import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmplopyeeService } from 'src/app/services/emplopyee.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss'],
})
export class ViewEmployeeComponent implements OnInit {
  public employeeDocuments: any;
  employee: any;
  id: any;
  docName: any;
  docImage: File;
  docId: any;
  img: any;

  constructor(
    private employeeService: EmplopyeeService,
    private router: Router,
    private route: ActivatedRoute,

  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.showEmployeeById(params['id']);
      this.getDocumentById(params['id']);
    });
  }

  showEmployeeById(id: any) {
    this.id = id;
    this.employeeService.getEmployeeById(this.id).subscribe((data: any) => {
      this.employee = data.responseData;
    });
  }

  getBack() {
    this.router.navigate(['/dashboard']);
  }

  handleFileInput(fileInput: any) {
    this.docImage = <File>fileInput.target.files[0];
  }

  submitForm(documentForm: any) {
    const employeeId = this.id;

    if (!this.docName || !this.docImage) {
      return;
    }
    this.employeeService
      .addDocument(employeeId, this.docName, this.docImage)
      .subscribe((data: any) => {
        this.showEmployeeById(this.id);
        this.getDocumentById(this.id);
        documentForm.reset();
        this.docName = '';
        this.img = ''
      });
  }

  getDocumentById(id: any) {
    this.id = id;
    this.employeeService.getDocumentById(this.id).subscribe((data: any) => {
      this.employeeDocuments = data.responseData;
    });
  }

  deleteDocument(id: any) {
    this.employeeService.deleteDocuments(this.id, id).subscribe((data: any) => {
      this.getDocumentById(this.id);
    });
  }

  editDocument(id: any) {
    this.employeeService
      .getDocumentByEmployeeId(this.id, id)
      .subscribe((data: any) => {
        this.docName = data.responseData.doc_name;
        this.docId = data.responseData.document_id;
        this.img = data.responseData.doc_image
      });
  }

  updateDocument() {
    const employeeId = this.id;

    if (!this.docName || !this.docImage) {
      return;
    }

    const formData = new FormData();
    formData.append('doc_name', this.docName);
    formData.append('doc_image', this.docImage);

    this.employeeService
      .updateDocumentById(employeeId, this.docId, this.docName, this.docImage)
      .subscribe(
        (data: any) => {
          this.showEmployeeById(this.id);
          this.getDocumentById(this.id);
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
}
