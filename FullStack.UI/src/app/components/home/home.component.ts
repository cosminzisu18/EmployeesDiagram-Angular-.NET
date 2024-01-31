import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  employees: any[] = [];
  groupedEmployees: { [key: string]: any[] } = {};
  isNoteVisible = true;

  constructor (private http: HttpClient){  }

  ngOnInit(): void{this.loadData()};


   loadData(): void {
    this.http.get(`http://localhost:5077/api/employees`).subscribe(( res:any ) => {
      this.employees= res;
      this.groupEmployeesByEmployer();
    })
  }; 

  groupEmployeesByEmployer(): void {
    this.employees.forEach(employee => {
      const employerId = employee.employers.id;
      if (!this.groupedEmployees[employerId]) {
        this.groupedEmployees[employerId] = [];
      }
      this.groupedEmployees[employerId].push(employee);
    });
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  };

  toggleNoteVisibility(): void {
    this.isNoteVisible = !this.isNoteVisible;
  }
}
