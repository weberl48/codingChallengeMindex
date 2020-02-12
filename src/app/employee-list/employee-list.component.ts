import {Component, OnInit} from '@angular/core';
import {catchError, map, reduce} from 'rxjs/operators';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  errorMessage: string;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.employeeService.getAll()
    .pipe(
      reduce((emps, e: Employee) => emps.concat(e), []),
      map(emps => this.employees = emps),
      catchError(this.handleError.bind(this))
    ).subscribe();
  }
  employeeDeleted($event) {
    console.log('event delete')
    console.log($event)
    this.employees = $event
    console.log('event delete')
    //this.employees = $event
  }
  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }
}
