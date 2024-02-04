import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { saveError } from '../../utilis/utilis';
import { ToastService } from '../../services/toast.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { faEdit,faDownload,faTrashAlt, faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-show-information',
  templateUrl: './show-information.component.html',
  styleUrl: './show-information.component.scss'
})
export class ShowInformationComponent {

  faTrashAlt=faTrashAlt;

  modal = {} as any; observations = {} as any; observationss: any[] = []; employers: any[] = []; employee: any; employeeId?: string; employerId?: string; showError = false;
  notes = [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }, { name: 6 }, { name: 7 }, { name: 8 }, { name: 9 }, { name: 10 }];

  constructor(private route: ActivatedRoute,private router: Router,private http: HttpClient, private toast: ToastService, private modalDelete: NgbModal) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.employeeId = params['employeeId']; 
    });
    this.observations.note = 1;
    this.getEmployee();
    this.getEmployers();
    this.getObservation();
    
  
  };

  save(){
    this.observations.employeesId = this.employeeId;
    if(this.handleValidation()){
      this.http.post(`http://localhost:5077/api/observations`, this.observations).subscribe(
        (response) => {this.toast.success('Add Observation Success');},
        (error) => {saveError('Post Observation Error', this.http, this.toast);}
      );
  }
  };

  delete(_row: any){
    const modalRef = this.modalDelete.open(ConfirmDialogComponent, { size: 'lg', keyboard: false, backdrop: 'static' });
    modalRef.componentInstance.title = `Observation Deletion`;
    modalRef.componentInstance.content = `<p class='text-center mt-1 mb-1'>Do you want to delete observation <b>${_row.observation}</b>?`;
    modalRef.closed.subscribe(() => {
      this.http.delete(`http://localhost:5077/api/observations/${_row.id}`).subscribe(
        () => window.location.reload(),
        (error) => {
          saveError('Delete Observation Error', this.http, this.toast);
        }
      );
    });
  };

  getEmployee() {
    this.http.get(`http://localhost:5077/api/employees/${this.employeeId}`).subscribe((res: any) => {
      this.modal = res;
    })
  };

  getEmployers(){
    this.http.get(`http://localhost:5077/api/employers`).subscribe((res: any) => {
      this.employers = res; 
    })
  };

  getObservation(){
    this.http.get(`http://localhost:5077/api/observations/byemployee/${this.employeeId}`).subscribe((res: any) => {
      this.observationss = res;
    })
  }

  goBack(){
    this.router.navigateByUrl('employees')
  };

  handleValidation =(): boolean => {
   
    if (!this.observations.employersId) {
      this.showError = true;
      this.toast.error('employer name is required!');
      return false;
    }
    if (!this.observations.observation) {
      this.showError = true;
      this.toast.error('observation is required!');
      return false;
    }

    return true;
};
}
