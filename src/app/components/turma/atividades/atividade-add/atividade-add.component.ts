import { TurmaService } from './../../../turma-home/turma-home.service';
import { SnackBarService } from './../../../../services/snack-bar.service';
import { take } from 'rxjs/operators';
import { AtividadeService } from './../atividade.service';
import { Atividade } from './../atividade.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as moment from 'moment';



@Component({
  selector: 'app-atividade-add',
  templateUrl: './atividade-add.component.html',
  styleUrls: ['./atividade-add.component.css']
})
export class AtividadeAddComponent implements OnInit {
  atividadeForm: FormGroup;
  minDate = new Date();

  isLoading: boolean = false;

  atividade: Atividade;

  constructor(
    private formBuilder: FormBuilder,
    private Location: Location,
    private atividadeService: AtividadeService,
    private snackBarService: SnackBarService,
    private turmaService: TurmaService
  ) {

    this.atividadeForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      pontuacao: ['', Validators.required],
      descricao: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataFinal: ['', Validators.required],
      horarioInicial: ['', Validators.required],
      horarioFinal: ['', Validators.required],
    })

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isLoading = true;
    let dataInicio = moment.utc(this.atividadeForm.value.dataInicio).local();
    let dataFim = moment.utc(this.atividadeForm.value.dataFinal).local();

    this.atividade = {
      titulo: this.atividadeForm.value.titulo,
      descricao: this.atividadeForm.value.descricao,
      experiencia: this.atividadeForm.value.pontuacao,
      inicioAtividade: dataInicio.format("DD/MM/YYYY") + ' ' + this.atividadeForm.value.horarioInicial,
      fimAtividade: dataFim.format("DD/MM/YYYY") + ' ' + this.atividadeForm.value.horarioFinal,
      turma: {
        id: this.turmaService.returnIdTurma()
      }
    }

    this.atividadeService.createAtividade(this.atividade).pipe(take(1)).subscribe(
      resp => {
        this.snackBarService.openSnackBar('Atividade criada com sucesso!', 'X', false);
        this.Location.back();
      },
      error => {
        this.isLoading = false;
        this.snackBarService.openSnackBar('Não foi possível criar a atividade, poderia verificar as informações por gentileza?', 'X', true);
      }
    )

  }

  onCancel() {
    this.Location.back();
  }

}
