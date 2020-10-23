import { take } from 'rxjs/operators';
import { TurmaService } from './../../../turma-home/turma-home.service';
import { PersonagemService } from './../../../personagem/personagem.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { Personagem } from 'src/app/components/personagem/personagem.model';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  dataSource: MatTableDataSource<Personagem>;
  displayedColumns: string[] = ['nickname', 'pontuacao', 'nivel'];

  constructor(
    private personagemService: PersonagemService,
    private turmaService: TurmaService
  ) { }

  ngOnInit(): void {
    let id_turma = this.turmaService.returnIdTurma();
    this.personagemService.getRanking(id_turma).pipe(take(1)).subscribe(
      resp => {
        this.dataSource = new MatTableDataSource(resp);
      }
    )
  }

}
