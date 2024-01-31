import { Component, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from '../../../../services/toast.service';
import { isValidEmail } from '../../../../utilis/utilis-validation';
import { isValidPhoneNumber } from '../../../../utilis/utilis-validation';

@Component({
  selector: 'addEdit-employers-list',
  templateUrl: './addEdit-employers.component.html',
  styleUrl: './addEdit-employers.component.scss'
})
export class AddEditModalEmployerComponent {
  
  @Input() public id_employer: any; showError = false;
  
  employers: any[] = []; modal = {} as any; departments: any[] = [];

  constructor(private http: HttpClient, public activeModal: NgbActiveModal, private toast: ToastService) { }

  ngOnInit(): void { 
    if(this.id_employer){
      this.http.get(`http://localhost:5077/api/employers/${this.id_employer}`).subscribe(( res:any ) => {
        this.modal= res;
      })
    };

    this.http.get(`http://localhost:5077/api/departments`).subscribe(( res:any ) => {
      this.departments= res;
    })
  };

  save(){
    if(this.handleValidation()){
      if(!this.id_employer){
        this.http.post(`http://localhost:5077/api/employers`, this.modal).subscribe(
          () => this.activeModal.close(),
          (error) => console.error("Error adding employee:", error)
        );
      }else{
        this.http.put(`http://localhost:5077/api/employers/${this.id_employer}`, this.modal).subscribe(
          () => this.activeModal.close(),
          (error) => {
            console.error("Error edit employee:", error);
          }
        );
      }
    }
  };

  handleValidation =(): boolean => {
   
    if (!this.modal.nameEmployer) {
      this.showError = true;
      this.toast.error('name is required!');
      return false;
    }
    if (!isValidEmail(this.modal.emailEmployer)) {
      this.showError = true;
      this.toast.error('please enter a valid email!');
      return false;
    }
    if (!isValidPhoneNumber(this.modal.phoneEmployer)) {
      this.showError = true;
      this.toast.error('please enter a valid phone number!');
      return false;
    }
    if (!this.modal.departmentEmployer) {
      this.showError = true;
      this.toast.error('department is required!');
      return false;
    }

    return true;
  };

}
