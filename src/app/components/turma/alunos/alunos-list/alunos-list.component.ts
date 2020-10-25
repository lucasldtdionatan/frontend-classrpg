import { DetalhePersonagemComponent } from './../../../template/detalhe-personagem/detalhe-personagem.component';
import { DialogMassageComponent } from './../../../template/dialog-massage/dialog-massage.component';
import { SnackBarService } from './../../../../services/snack-bar.service';
import { take } from 'rxjs/operators';
import { TurmaService } from './../../../turma-home/turma-home.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Personagem } from 'src/app/components/personagem/personagem.model';

import { PersonagemService } from './../../../personagem/personagem.service';

import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-alunos-list',
  templateUrl: './alunos-list.component.html',
  styleUrls: ['./alunos-list.component.css']
})
export class AlunosListComponent implements OnInit, AfterViewInit {

  // displayedColumns: string[] = ['nickname', 'nomeAluno', 'email', 'pontuacao'];
  displayedColumns: string[] = ['usuario.nome', 'usuario.nickname', 'usuario.email', 'experiencia', 'action']
  personagens: Personagem[] = [];
  dataSource: MatTableDataSource<Personagem>;
  qtd_registros: number
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private personagemService: PersonagemService,
    private turmaService: TurmaService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.getPersonagens();
  }

  getPersonagens() {
    let idTurma = this.turmaService.returnIdTurma();
    this.personagemService.getPersonagensByTurma(idTurma).subscribe(
      resp => {
        this.personagemService.getQtdPersonagemByTurma(idTurma);

        this.dataSource = new MatTableDataSource(resp);
        this.qtd_registros = this.dataSource.data.length;
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'usuario.nome': return item.usuario.nome;
            case 'usuario.email': return item.usuario.nome;
            case 'usuario.nickname': return item.usuario.nickname;
            default: return item[property];
          }
        };

        this.dataSource.filterPredicate = function (data, filter): boolean {
          return data.usuario.nome.toLowerCase().includes(filter) || data.usuario.nickname.toLowerCase().includes(filter);
        };

        this.dataSource.sort = this.sort;
      }
    )
  }

  openDetailsPersonagem(personagem: Personagem) {
    const dialogRef = this.dialog.open(DetalhePersonagemComponent, {
      width: '85%',
      data: { personagem: personagem }
    });
  }

  onDelete(id_personagem: string) {
    let confirmationDelete: boolean;

    const dialogRef = this.dialog.open(DialogMassageComponent, {
      data: { message: 'Tem certeza que deseja excluir este personagem da turma?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      confirmationDelete = result;

      if (confirmationDelete) {
        this.personagemService.deletePersonagem(id_personagem).pipe(take(1)).subscribe(
          resp => {
            this.snackBarService.openSnackBar("O personagem foi excluído com sucesso!", "X", false);
            this.getPersonagens();
          },
          error => {
            this.snackBarService.openSnackBar(error.error.mensagem, "X", true);
          }
        )
      }
    });


  }

}

