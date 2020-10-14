import { TurmaService } from './../../../turma-home/turma-home.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Personagem } from 'src/app/components/personagem/personagem.model';

import { PersonagemService } from './../../../personagem/personagem.service';

import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';



export interface PeriodicElement {
  id: number;
  email: string;
  experiencia: number;
  nome: string;
  nickname: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];

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
  teste: PeriodicElement[]
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private personagemService: PersonagemService,
    private turmaService: TurmaService
  ) { }

  ngOnInit() {
    // this.personagemService.getPersonagensByTurma('99').subscribe(
    //   resp => {
    //     this.dataSource = new MatTableDataSource(resp);
    //     console.log(resp)
    //     this.dataSource.sort = this.sort;
    //   }
    // )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    let idTurma = this.turmaService.returnIdTurma();
    this.personagemService.getPersonagensByTurma(idTurma).subscribe(
      resp => {
        this.dataSource = new MatTableDataSource(resp);
        console.log(resp)
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

        // this.dataSource.filterPredicate = function (data, filter): boolean {
        //   return data.usuario.email.toLowerCase().includes(filter);
        // };
        // this.dataSource.filterPredicate = function (data, filter): boolean {
        //   return data.usuario.nickname.toLowerCase().includes(filter);
        // };

        this.dataSource.sort = this.sort;
      }
    )
  }
}

