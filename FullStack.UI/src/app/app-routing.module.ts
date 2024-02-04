import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { EmployersListComponent } from './components/employers/employers-list/employers-list.component';
import { AddEditEmployeeComponent } from './components/employees/addEdit-employee/addEdit-employee.component';
import { HomeComponent } from './components/home/home.component';
import { DepartmentComponent } from './components/department/department.component';
import { ShowInformationComponent } from './components/show-information/show-information.component';


const routes: Routes = [
  { path: '', component: HomeComponent},

  { path: 'employees', component: EmployeesListComponent },
  { path: 'employees/addEdit', component: AddEditEmployeeComponent },
  { path: 'employees/addEdit/:id', component: AddEditEmployeeComponent },

  { path: 'employers', component: EmployersListComponent },

  { path: 'department', component: DepartmentComponent },

  { path: 'information', component: ShowInformationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
