import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';
import { FormBuilder} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { isValidEmail } from '../../../utilis/utilis-validation';
import { isValidPhoneNumber } from '../../../utilis/utilis-validation';
import { saveError } from '../../../utilis/utilis';
import { FetchService } from '../../../services/fetch.service';


@Component({
  selector: 'appEdit-add-employee',
  templateUrl: './addEdit-employee.component.html',
  styleUrl: './addEdit-employee.component.scss'
})
export class AddEditEmployeeComponent implements OnInit {
  
  
  modal = {} as any;employers: any[] = []; employeeId?: string; employerNameExist?: string; employerId?: string; employerDepartment?: string;
  selectedEmployer: any | null = null; departments: any[] = []; showError = false;

  constructor( private router: Router, private http: HttpClient, private fb: FormBuilder, private route: ActivatedRoute, private toast: ToastService ){}

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.employerNameExist = params['employerName'];
      this.employerId = params['employerId'];
      this.employerDepartment = params['employerDepartment'];
    });
    this.route.params.subscribe(params => {
      this.employeeId = params['id'];
    });

    this.modal.employer = this.employerNameExist; 
    
    if(this.employeeId){
      this.getEmployee();
    }  
    
    this.getEmployers(); 

    this.http.get(`http://localhost:5077/api/departments`).subscribe(( res:any ) => {
      this.departments= res;
    })
  };

  save() {

    if(this.handleValidation()){

      if(!this.employerNameExist ){
      this.modal.employersId = this.selectedEmployer.id;
      }else{
        this.modal.employersId = this.employerId;
        this.modal.department = this.employerDepartment;
      }

      if(!this.employeeId){
        this.http.post('http://localhost:5077/api/employees', this.modal).subscribe(() => {
          this.router.navigate(['employees']);
          this.toast.success('Add Employee Success');
        },
          (error) => {
            saveError('Post Employees Error', this.http, this.toast);
          }
        );
      }else{
        this.http.put(`http://localhost:5077/api/employees/${this.employeeId}`, this.modal).subscribe(() => {
          this.router.navigate(['employees']);
          this.toast.success('Modify Employee Success');
        },
          (error) => {
            saveError('Put Employees Error', this.http, this.toast);
          }
        );
      }
    }
  };

  getEmployee() {
    this.http.get(`http://localhost:5077/api/employees/${this.employeeId}`).subscribe((res: any) => {
      this.modal = res;
    })
  };

  getEmployers(){
    this.http.get(`http://localhost:5077/api/employers`).subscribe(( res:any ) => {
      this.employers = res;
    })
  };

  onEmployerSelect(selectedEmployer: any) {
    this.employers.forEach(employer => employer.selected = false);
    this.selectedEmployer = selectedEmployer;
    this.modal.department = selectedEmployer.departmentEmployer;
    selectedEmployer.selected = true;
  };

  back(){
    this.router.navigateByUrl('employees')
  };

  handleValidation =(): boolean => {
   
        if (!this.modal.name) {
          this.showError = true;
          this.toast.error('name is required!');
          return false;
        }
        if (!isValidEmail(this.modal.email)) {
          this.showError = true;
          this.toast.error('valid email is required!');
          return false;
        }
        if (!isValidPhoneNumber(this.modal.phone)) {
          this.showError = true;
          this.toast.error('phone is required!');
          return false;
        }
        if (!this.modal.salary) {
          this.showError = true;
          this.toast.error('salary is required!');
          return false;
        }
        if(!this.employerNameExist){
        if (!this.selectedEmployer) {
          this.showError = true;
          this.toast.error('please select an employer!');
          return false;
        }
      }
        return true;
  };

  allowOnlyNumbers = (event: any): void => {
    const inputChar = String.fromCharCode(event.charCode);

    if (!/^\d+$/.test(inputChar)) {
      event.preventDefault();
    }
  };
}
