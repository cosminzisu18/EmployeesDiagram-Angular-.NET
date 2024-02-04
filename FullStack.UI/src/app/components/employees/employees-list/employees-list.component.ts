import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { faEdit,faDownload,faTrashAlt, faCirclePlus, faSortUp, faSortDown , faInfo} from '@fortawesome/free-solid-svg-icons';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { REPLACE_DIACRITICS } from '../../../utilis/replace-diacritics';
import { cloneDeep } from '../../../utilis/utilis';
import { FilterService } from '../../../utilis/filter.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss'
})
export class EmployeesListComponent {
  faEdit = faEdit; faDownload= faDownload; faTrashAlt = faTrashAlt; faCirclePlus= faCirclePlus; faSortUp = faSortUp; faSortDown = faSortDown; faInfo = faInfo;
  filter = {} as any; filteredEmployees: any = [];
  employees: any[] = []; sortDirection: 'asc' | 'desc' = 'asc';
  constructor (private http: HttpClient, private router: Router, private modal: NgbModal, private filterService: FilterService ){  }

  ngOnInit(): void{
   this.loadData()
  }


  loadData(): void {
    this.http.get(`http://localhost:5077/api/employees`).subscribe(( res:any ) => {
      this.employees= res;
      this.filteredEmployees = this.employees;
      console.log("employees ", this.employees)
    })
  };

  delete(_row: any){
    const modalRef = this.modal.open(ConfirmDialogComponent, { size: 'lg', keyboard: false, backdrop: 'static' });
    modalRef.componentInstance.title = `Employee Deletion`;
    modalRef.componentInstance.content = `<p class='text-center mt-1 mb-1'>Do you want to delete employee <b>${_row.name}</b>?`;
    modalRef.closed.subscribe(() => {
      this.http.delete(`http://localhost:5077/api/employees/${_row.id}`).subscribe(
        () => this.loadData(),
        (error) => {
          console.error("Error delete employee:", error);
        }
      );
    });
  };

  filterTable = (): void => {
    const arr = cloneDeep(this.employees);
    const { name, email, phone, salary, department, nameEmployer } = this.filter;

    for (let i = arr.length - 1; i >= 0; i--) {
      const item = arr[i];
      if (name&& REPLACE_DIACRITICS(item.name).indexOf(REPLACE_DIACRITICS(name)) === -1) {
        arr.splice(i, 1);
        continue;
      }
      if (email  && REPLACE_DIACRITICS(item.email).indexOf(REPLACE_DIACRITICS(email)) === -1) {
        arr.splice(i, 1);
        continue;
      }
      if (phone  && REPLACE_DIACRITICS(item.phone ).indexOf(REPLACE_DIACRITICS(phone )) === -1) {
        arr.splice(i, 1);
        continue;
      }
      if (salary  && REPLACE_DIACRITICS(item.salary ).indexOf(REPLACE_DIACRITICS(salary )) === -1) {
        arr.splice(i, 1);
        continue;
      }
      if (department  && REPLACE_DIACRITICS(item.department ).indexOf(REPLACE_DIACRITICS(department )) === -1) {
        arr.splice(i, 1);
        continue;
      }
      if (nameEmployer  && REPLACE_DIACRITICS(item.employers.nameEmployer ).indexOf(REPLACE_DIACRITICS(nameEmployer )) === -1) {
        arr.splice(i, 1);
        continue;
      }
    }

    this.filterService.setFilter(this.filter, `employee`);
    this.filteredEmployees = arr;
  };

  clear = (key: string | number) => {
    this.filter[key] = undefined;
    this.filterTable();
  };

  showInformation(employee: any) {
    this.router.navigate(['information'], { queryParams: { employeeId: employee.id } });
  };

  sortTable(column: string): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  
    this.filteredEmployees.sort((a:any, b:any) => {
      const salaryA = a.salary;
      const salaryB = b.salary;
  
      if (this.sortDirection === 'asc') {
        return salaryA - salaryB;
      } else if (this.sortDirection === 'desc') {
        return salaryB - salaryA;
      }
  
      return 0;
    });
  };
}
