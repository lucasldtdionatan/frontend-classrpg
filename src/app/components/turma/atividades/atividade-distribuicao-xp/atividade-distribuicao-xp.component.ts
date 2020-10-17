import { Location } from '@angular/common';
import { SnackBarService } from './../../../../services/snack-bar.service';
import { ConclusaoAtividade } from './../../../../models/conclusao-atividade';
import { ConclusaoAtividadeService } from './../conclusao-atividade.service';
import { PersonagemAtividade } from './../../../personagem/personagem.model';
import { PersonagemService } from './../../../personagem/personagem.service';
import { TurmaService } from './../../../turma-home/turma-home.service';
import { MatTableDataSource } from '@angular/material/table';
import { Atividade } from './../atividade.model';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AtividadeService } from './../atividade.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atividade-distribuicao-xp',
  templateUrl: './atividade-distribuicao-xp.component.html',
  styleUrls: ['./atividade-distribuicao-xp.component.css']
})
export class AtividadeDistribuicaoXPComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Nome do aluno', 'Pontuacao'];

  idAtividade: string;
  idTurma: string;
  atividade: Atividade;
  personagens: PersonagemAtividade[];
  conclusaoAtividade: ConclusaoAtividade;


  constructor(
    private atividadeService: AtividadeService,
    private turmaService: TurmaService,
    private personagemService: PersonagemService,
    private route: ActivatedRoute,
    private conclusaoAtividadeService: ConclusaoAtividadeService,
    private snackBarService: SnackBarService,
    private Location: Location,
  ) {
    this.atividade = {
      titulo: null,
      descricao: null,
      experiencia: null,
      fimAtividade: null,
      inicioAtividade: null
    }
  }

  ngOnInit(): void {
    this.idAtividade = this.route.snapshot.paramMap.get('id');
    this.idTurma = this.turmaService.returnIdTurma();

    this.atividadeService.getAtividadeById(this.idAtividade).pipe(take(1)).subscribe(
      resp => {
        this.atividade = resp;
      }
    )
    this.getPersonagens();
  }

  onSubmit(personagem: PersonagemAtividade) {

    if (personagem.conclusaoAtividade.id == undefined || personagem.conclusaoAtividade.id == null) {
      this.conclusaoAtividade = {
        experiencia: personagem.conclusaoAtividade.experiencia,
        atividade: {
          id: Number(this.idAtividade)
        },
        personagem: {
          id: personagem.id
        },
        turma: {
          id: Number(this.idTurma)
        }
      }
      this.conclusaoAtividadeService.save(this.conclusaoAtividade).pipe(take(1)).subscribe(
        resp => {
          this.getPersonagens();
          this.snackBarService.openSnackBar('Salvo com sucesso!', 'X', false);
        },
        error => {
          this.snackBarService.openSnackBar(error.error.mensagem, 'X', true);
        }
      )
    } else {
      this.conclusaoAtividadeService.update(personagem.conclusaoAtividade.id, personagem.conclusaoAtividade.experiencia)
        .pipe(take(1)).subscribe(
          resp => {
            this.getPersonagens();
            this.snackBarService.openSnackBar('Salvo com sucesso!', 'X', false);
          },
          error => {
            this.snackBarService.openSnackBar(error.error.mensagem, 'X', true);
          }
        )
    }
  }

  getPersonagens() {
    this.personagemService.getPersonagemByTurmaAndAtividade(this.idTurma, this.idAtividade).pipe(take(1)).subscribe(
      resp => {
        this.personagens = resp;
        this.dataSource = new MatTableDataSource(this.personagens);
      }
    )
  }

  back(){
    this.Location.back();
  }

}
