import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-massage',
  templateUrl: './dialog-massage.component.html',
  styleUrls: ['./dialog-massage.component.css']
})
export class DialogMassageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogMassageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
