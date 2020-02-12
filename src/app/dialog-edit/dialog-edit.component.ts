import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Employee } from '../employee';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css']
})


export class DialogEditComponent implements OnInit {

  form: FormGroup;
   employee: Employee;
  constructor(public dialogRef: MatDialogRef<DialogEditComponent>,
    private formBuilder: FormBuilder,

    @Inject(MAT_DIALOG_DATA) public data: any)
    { this.employee = data;}

ngOnInit() {
  this.form = this.formBuilder.group({
    compensation: this.data.compensation ? this.data.compensation : ''
  })
}
submit(form) {
  this.dialogRef.close(form.value.compensation.toString())
//console.log(`${form.value.compensation}`)
}
}
