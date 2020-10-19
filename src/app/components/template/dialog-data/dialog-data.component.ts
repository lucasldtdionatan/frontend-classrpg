import { SnackBarService } from './../../../services/snack-bar.service';
import { take } from 'rxjs/operators';
import { TurmaService } from './../../turma-home/turma-home.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TurmaList } from './../../turma-home/turma-home.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-dialog-data',
  templateUrl: './dialog-data.component.html',
  styleUrls: ['./dialog-data.component.css']
})
export class DialogDataComponent implements OnInit {

  data_limite_form: FormGroup;
  turma: TurmaList;
  minDate = new Date();
  constructor(
    private formBuilder: FormBuilder,
    private turmaService: TurmaService,
    private snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<DialogDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.data_limite_form = this.formBuilder.group({
      data_inicial: ['', Validators.required],
      data_final: ['', Validators.required],
      hora_inicial: ['', Validators.required],
      hora_final: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.turma = this.data.turma;

    if (this.turma.inicioRecompensa != undefined && this.turma.fimRecompensa != undefined) {

      let data_inicial = moment(this.turma.inicioRecompensa, "DD/MM/YYYY HH:mm");
      let data_final = moment(this.turma.fimRecompensa, "DD/MM/YYYY HH:mm");

      this.data_limite_form.patchValue({
        data_inicial: new Date(data_inicial.format("YYYY/MM/DD")),
        data_final: new Date(data_final.format("YYYY/MM/DD")),
        hora_inicial: data_inicial.format("HH:mm"),
        hora_final: data_final.format("HH:mm"),
      })
    }

  }

  onSubmit(): void {
    let data_inicial = moment.utc(this.data_limite_form.value.data_inicial).local();
    let data_final = moment.utc(this.data_limite_form.value.data_final).local();

    this.turma.inicioRecompensa = data_inicial.format("DD/MM/YYYY") + ' ' + this.data_limite_form.value.hora_inicial;
    this.turma.fimRecompensa = data_final.format("DD/MM/YYYY") + ' ' + this.data_limite_form.value.hora_final;

    this.turmaService.updateTurma(this.turma).pipe(take(1)).subscribe(
      resp => {
        this.dialogRef.close();
        this.snackBarService.openSnackBar('Data limite definida com sucesso!', 'X', false);
      },
      error => {
        this.snackBarService.openSnackBar(error.error.mensagem, 'X', false);
      }
    )

  }
}
