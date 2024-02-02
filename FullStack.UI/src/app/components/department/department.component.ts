import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faEdit,faDownload,faTrashAlt, faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import { AddEditModalDepartmentComponent } from './modal/addEdit-department.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { saveError } from '../../utilis/utilis';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent {
  faEdit = faEdit; faDownload= faDownload; faTrashAlt = faTrashAlt; faCirclePlus= faCirclePlus;


  departments: any[] = [];
  constructor (private http: HttpClient, private modal: NgbModal, private toast: ToastService ){  }

  ngOnInit(): void{
   this.loadData()
  }
  loadData(): void {
    this.http.get(`http://localhost:5077/api/departments`).subscribe(( res:any ) => {
      this.departments = res;
    })
  };

  departmentAddEdit(id_department?: any) { 
    const modalRef = this.modal.open(AddEditModalDepartmentComponent, { size: 'sm', windowClass: 'modal-xl', keyboard: false, backdrop: 'static' });
    modalRef.componentInstance.id_department = id_department;
    modalRef.closed.subscribe(() => this.loadData());
  }

  delete(_row: any){
    const modalRef = this.modal.open(ConfirmDialogComponent, { size: 'lg', keyboard: false, backdrop: 'static' });
    modalRef.componentInstance.title = `Department Deletion`;
    modalRef.componentInstance.content = `<p class='text-center mt-1 mb-1'>Do you want to delete <b>${_row.nameDepartment} </b> department?`;
    modalRef.closed.subscribe(() => {
      this.http.delete(`http://localhost:5077/api/departments/${_row.id}`).subscribe(
        () => this.loadData(),
        (error) => {
          saveError('Delete Department Error', this.http, this.toast);
        }
      );
    });
  };
}
