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
  minDate = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private atividadeService: AtividadeService
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

        this.atividadeForm.patchValue({
          titulo: this.atividade.titulo,
          pontuacao: this.atividade.experiencia,
          descricao: this.atividade.descricao,
          dataInicio: new Date(this.atividade.inicioAtividade),
          dataFinal: new Date(),
        })
      }
    )
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isLoading = true;
  }

  onCancel() {

  }

}
