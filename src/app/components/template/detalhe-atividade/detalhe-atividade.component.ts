import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-detalhe-atividade',
  templateUrl: './detalhe-atividade.component.html',
  styleUrls: ['./detalhe-atividade.component.css']
})
export class DetalheAtividadeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DetalheAtividadeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
