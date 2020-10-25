import { MatTableDataSource } from '@angular/material/table';
import { Recompensa } from './../../turma/recompensa/recompensa.model';
import { take } from 'rxjs/operators';
import { ColherRecompensaService } from './../../../services/colher-recompensa.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-detalhe-personagem',
  templateUrl: './detalhe-personagem.component.html',
  styleUrls: ['./detalhe-personagem.component.css']
})
export class DetalhePersonagemComponent implements OnInit {

  qtd_registros: number
  recompensas: Recompensa[];
  dataSource: MatTableDataSource<Recompensa>;
  displayedColumns: string[] = ['imagem', 'titulo', 'nivel'];
  constructor(
    private colherRecompensaService: ColherRecompensaService,

    public dialogRef: MatDialogRef<DetalhePersonagemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.colherRecompensaService.getRecompensasByPersonagem(this.data.personagem.id).pipe(take(1)).subscribe(
      resp => {
        this.recompensas = resp;
        console.log(this.recompensas)
        this.dataSource = new MatTableDataSource(this.recompensas);
        this.qtd_registros = this.dataSource.data.length;
      }
    )

  }

}
