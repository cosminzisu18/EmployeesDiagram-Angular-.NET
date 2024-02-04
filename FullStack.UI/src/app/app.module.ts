import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EmployersListComponent } from './components/employers/employers-list/employers-list.component';
import { AddEditModalEmployerComponent } from './components/employers/employers-list/modal/addEdit-employers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModalModule , NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AddEditEmployeeComponent } from './components/employees/addEdit-employee/addEdit-employee.component';
import { HomeComponent } from './components/home/home.component';
import { DepartmentComponent } from './components/department/department.component';
import { AddEditModalDepartmentComponent } from './components/department/modal/addEdit-department.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ShowInformationComponent } from './components/show-information/show-information.component';




@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    EmployersListComponent,
    AddEditModalEmployerComponent,
    ConfirmDialogComponent,
    AddEditEmployeeComponent,
    HomeComponent,
    DepartmentComponent,
    AddEditModalDepartmentComponent,
    HeaderComponent,
    ShowInformationComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    NgbModalModule,
    ToastModule,
    BrowserAnimationsModule,
    NgSelectModule,
  ],
  providers: [
    NgbActiveModal,
    MessageService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
