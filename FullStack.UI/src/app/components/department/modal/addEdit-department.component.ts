import { Component, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'addEdit-department',
  templateUrl: './addEdit-department.component.html',
  styleUrl: './addEdit-department.component.scss'
})
export class AddEditModalDepartmentComponent {
  @Input() public id_department: any
  employers: any[] = []; modal = {} as any;   showError = false;
  constructor(private http: HttpClient, public activeModal: NgbActiveModal, private toast: ToastService) { }


  ngOnInit(): void { 

    if(this.id_department){
    this.http.get(`http://localhost:5077/api/departments/${this.id_department}`).subscribe(( res:any ) => {
      this.modal= res;
    })
   }
  };

  save(){

    if(this.handleValidation()){
    if(!this.id_department){
      this.http.post(`http://localhost:5077/api/departments`, this.modal).subscribe(
        () => this.activeModal.close(),
        (error) => console.error("Error adding department:", error)
      );
    }else{
      this.http.put(`http://localhost:5077/api/departments/${this.id_department}`, this.modal).subscribe(
        () => this.activeModal.close(),
        (error) => {
          console.error("Error edit department:", error);
        }
      );
    }
  }
  };

  handleValidation =(): boolean => {
    if (!this.modal.nameDepartment) {
      this.showError = true;
      this.toast.error('department name is required!');
      return false;
    }
    return true;
  };
}
