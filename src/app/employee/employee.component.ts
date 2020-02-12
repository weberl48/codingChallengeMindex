import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {EmployeeService} from '../employee.service';
import {Employee} from '../employee';
import {catchError, map, reduce} from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import {DialogModalComponent} from '../dialog-modal/dialog-modal.component';
import {DialogEditComponent} from '../dialog-edit/dialog-edit.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Output() edit = new EventEmitter<Employee>();
  @Output() delete = new EventEmitter<Employee[]>();
  private copmensation: number;
  private directReports: Employee[] = [];
  employees: Employee[];
  errorMessage: string;
  private totalReports: number;
  constructor( private data: EmployeeService, public dialog: MatDialog ) {}

ngOnInit() {
  this.getReports();
};

private handleError(e: Error | any): string {
  console.error(e);
  return this.errorMessage = e.message || 'Unable to retrieve employees';
}
openDialogDelete(event, employee): void {
  this.employee = employee

  const dialogRef = this.dialog.open(DialogModalComponent, {

    data: {}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(result)
    if (result) {
      this.data.remove(this.employee).subscribe(result => {
        this.data.getAll()
        .pipe(
          reduce((emps, e: Employee) => emps.concat(e), []),
          map(emps => this.employees = emps),
          catchError(this.handleError.bind(this))
        ).subscribe( result => {
            this.delete.emit(this.employees)
        });
      })
    }
});
}
  openDialogEdit(event, employee): void {
  this.employee = employee

    const dialogRefEdit = this.dialog.open(DialogEditComponent, {
      width: '250px',
      data:{}
    });

    dialogRefEdit.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
        this.employee.compensation = result
        this.data.save(this.employee)
      }
  });
}

getReports() {
  this.data.getAll()
  .pipe(
    reduce((emps, e: Employee) => emps.concat(e), [])
  ).subscribe(
    emps => {
    for (const employee in emps) {
      if (emps.hasOwnProperty(employee)) {
        //const currentEmployee = emps[employee];
        emps.forEach((person, index, array) => {
          if(person.directReports) {
              //person['totalReports'] = person.directReports.length + 1
              person.directReports.forEach(element => {
                person['totalReports'].push()
              });
          }
        });

      }
    }
    }
  )
  }

}






