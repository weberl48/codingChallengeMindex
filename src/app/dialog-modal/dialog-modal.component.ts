import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.css']
})
export class DialogModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogModalComponent>,

      @Inject(MAT_DIALOG_DATA) public data: any) {
     }


  ngOnInit() {


  }
  delete() {
    this.dialogRef.close("deleted")
  }
}
