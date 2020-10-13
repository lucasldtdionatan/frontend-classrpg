import { SnackBarService } from './../../../../services/snack-bar.service';
import { Location } from '@angular/common';
import { Atividade } from './../atividade.model';
import { take } from 'rxjs/operators';
import { AtividadeService } from './../atividade.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-atividade-edit',
  templateUrl: './atividade-edit.component.html',
  styleUrls: ['./atividade-edit.component.css']
})
export class AtividadeEditComponent implements OnInit {
  atividadeForm: FormGroup;
  atividade: Atividade;
  id: string;
  isLoading: boolean = false;
  minDate: Date;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private atividadeService: AtividadeService,
    private Location: Location,
    private snackBarService: SnackBarService,
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

    this.id = this.route.snapshot.paramMap.get('id');
    this.atividadeService.getAtividadeById(this.id).pipe(take(1)).subscribe(
      resp => {
        this.atividade = resp;
        let dateInicial = moment(this.atividade.inicioAtividade, "DD/MM/YYYY HH:mm");
        let dateEnd = moment(this.atividade.fimAtividade, "DD/MM/YYYY HH:mm");
        this.minDate = new Date(dateInicial.format("YYYY/MM/DD"));

        this.atividadeForm.patchValue({
          titulo: this.atividade.titulo,
          pontuacao: this.atividade.experiencia,
          descricao: this.atividade.descricao,
          dataInicio: new Date(dateInicial.format("YYYY/MM/DD")),
          dataFinal: new Date(dateEnd.format("YYYY/MM/DD")),
          horarioInicial: dateInicial.format("HH:mm"),
          horarioFinal: dateEnd.format("HH:mm"),
        })
      }
    )
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isLoading = true;
    let dataInicio = moment.utc(this.atividadeForm.value.dataInicio).local();
    let dataFim = moment.utc(this.atividadeForm.value.dataFinal).local();

    this.atividade = {
      id: this.atividade.id,
      titulo: this.atividadeForm.value.titulo,
      descricao: this.atividadeForm.value.descricao,
      experiencia: this.atividadeForm.value.pontuacao,
      inicioAtividade: dataInicio.format("DD/MM/YYYY") + ' ' + this.atividadeForm.value.horarioInicial,
      fimAtividade: dataFim.format("DD/MM/YYYY") + ' ' + this.atividadeForm.value.horarioFinal,
      turma: {
        id: this.atividade.turma.id
      }
    }
    this.atividadeService.updateAtividade(this.atividade).pipe(take(1)).subscribe(
      resp => {
        this.snackBarService.openSnackBar('Atividade atualizada com sucesso!', 'X', false);
        this.Location.back();
      },
      error => {
        this.isLoading = false;
        this.snackBarService.openSnackBar('Não foi possível atualizar a atividade, poderia verificar as informações por gentileza?', 'X', true);
      }
    )
  }

  onCancel() {
    this.Location.back();
  }

}
