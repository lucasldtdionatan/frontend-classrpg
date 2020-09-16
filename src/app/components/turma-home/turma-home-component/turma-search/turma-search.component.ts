import { Router } from '@angular/router';
import { PersonagemService } from './../../../personagem/personagem.service';
import { SnackBarService } from './../../../../services/snack-bar.service';
import { TurmaService } from './../../turma-home.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { TurmaList } from './../../turma-home.model';
import { Personagem } from './../../../personagem/personagem.model';

@Component({
  selector: 'app-turma-search',
  templateUrl: './turma-search.component.html',
  styleUrls: ['./turma-search.component.css']
})
export class TurmaSearchComponent implements OnInit {

  turma: TurmaList = null;
  personagem: Personagem = new Personagem();

  formCodigo: FormGroup;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private turmaService: TurmaService,
    private snackBarService: SnackBarService,
    private personagemService: PersonagemService,
  ) {
    this.formCodigo = this.formBuilder.group({
      codigoTurma: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.isLoading = true;
    this.turmaService.getTurmaById(this.formCodigo.get("codigoTurma").value).subscribe(
      resp => {
        this.turma = resp;
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        this.snackBarService.openSnackBar(error.error.mensagem, 'X', true);
      });
  }

  onSubmitPersonagem() {
    this.personagem.turma = this.turma;

    this.personagemService.createPersonagem(this.personagem).subscribe(
      resp => {
        this.isLoading = false;
        this.snackBarService.openSnackBar('Operação realizada com sucesso', 'X', false);
        this.router.navigate(['/turmas']);
      },
      error => {
        this.isLoading = false;
        console.log(error)
        this.snackBarService.openSnackBar(error.error.mensagem, 'X', true);
      })
  }

  onCancel() {
    this.router.navigate(['/turmas']);
  }

  onCancelSearch(){
    this.turma = null;
  }
}

