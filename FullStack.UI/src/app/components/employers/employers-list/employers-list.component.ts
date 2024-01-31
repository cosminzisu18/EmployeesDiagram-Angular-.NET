import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faEdit,faDownload,faTrashAlt, faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditModalEmployerComponent } from './modal/addEdit-employers.component';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { REPLACE_DIACRITICS } from '../../../utilis/replace-diacritics';
import { cloneDeep } from '../../../utilis/utilis';
import { FilterService } from '../../../utilis/filter.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-employers-list',
  templateUrl: './employers-list.component.html',
  styleUrl: './employers-list.component.scss'
})
export class EmployersListComponent {

  faEdit = faEdit; faDownload= faDownload; faTrashAlt = faTrashAlt; faCirclePlus= faCirclePlus;
  employers: any[] = []; filter = {} as any; filteredEmployers: any = [];

  constructor( private http: HttpClient, private modal: NgbModal, public activeModal: NgbActiveModal, private filterService: FilterService, private router: Router){  }

  ngOnInit(): void{this.loadData()};
 
   loadData(): void {
     this.http.get(`http://localhost:5077/api/employers`).subscribe(( res:any ) => {
       this.employers= res;
       this.filteredEmployers = this.employers;
     })
   };

   employerAddEdit(id_employer?: any) { 
    const modalRef = this.modal.open(AddEditModalEmployerComponent, { size: 'lg', windowClass: 'modal-xl', keyboard: false, backdrop: 'static' });
    modalRef.componentInstance.id_employer = id_employer;
    modalRef.closed.subscribe(() => this.loadData());
  };

  delete(_row: any){
    const modalRef = this.modal.open(ConfirmDialogComponent, { size: 'lg', keyboard: false, backdrop: 'static' });
    modalRef.componentInstance.title = `Employer Deletion`;
    modalRef.componentInstance.content = `<p class='text-center mt-1 mb-1'>Do you want to delete employer <b>${_row.name}</b>?`;
    modalRef.closed.subscribe(() => {
      this.http.delete(`http://localhost:5077/api/employers/${_row.id}`).subscribe(
        () => this.loadData(),
        (error) => {
          console.error("Error adding employee:", error);
        }
      );
    });
  };

  addEmployee(employer: any) {
    this.router.navigate(['employees', 'addEdit'], { queryParams: { employerName: employer.nameEmployer, employerId: employer.id, employerDepartment: employer.departmentEmployer } });
  };

  filterTable = (): void => {
    const arr = cloneDeep(this.employers);
    const { nameEmployer, emailEmployer, phoneEmployer, departmentEmployer } = this.filter;

    for (let i = arr.length - 1; i >= 0; i--) {
      const item = arr[i];
      if (nameEmployer&& REPLACE_DIACRITICS(item.nameEmployer).indexOf(REPLACE_DIACRITICS(nameEmployer)) === -1) {
        arr.splice(i, 1);
        continue;
      }
      if (emailEmployer  && REPLACE_DIACRITICS(item.emailEmployer).indexOf(REPLACE_DIACRITICS(emailEmployer)) === -1) {
        arr.splice(i, 1);
        continue;
      }
      if (phoneEmployer  && REPLACE_DIACRITICS(item.phoneEmployer ).indexOf(REPLACE_DIACRITICS(phoneEmployer )) === -1) {
        arr.splice(i, 1);
        continue;
      }
      if (departmentEmployer  && REPLACE_DIACRITICS(item.departmentEmployer ).indexOf(REPLACE_DIACRITICS(departmentEmployer )) === -1) {
        arr.splice(i, 1);
        continue;
      }
    }

    this.filterService.setFilter(this.filter, `employer`);
    this.filteredEmployers = arr;
    console.log("FilteredEmployers ", this.filteredEmployers)
  };

  clear = (key: string | number) => {
    this.filter[key] = undefined;
    this.filterTable();
  };
}


