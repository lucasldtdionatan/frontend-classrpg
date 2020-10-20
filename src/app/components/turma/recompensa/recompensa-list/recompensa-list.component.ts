import { TurmaList } from './../../../turma-home/turma-home.model';
import { DialogDataComponent } from './../../../template/dialog-data/dialog-data.component';
import { DialogMassageComponent } from './../../../template/dialog-massage/dialog-massage.component';
import { SnackBarService } from './../../../../services/snack-bar.service';
import { take } from 'rxjs/operators';
import { RecompensaService } from './../recompensa.service';
import { TurmaService } from './../../../turma-home/turma-home.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { Recompensa } from '../recompensa.model';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-recompensa-list',
  templateUrl: './recompensa-list.component.html',
  styleUrls: ['./recompensa-list.component.css']
})
export class RecompensaListComponent implements OnInit {

  dataSource: MatTableDataSource<Recompensa>;
  displayedColumns: string[] = ['imagem', 'titulo', 'nivel', 'action'];

  dataLimiteInicio: any;
  dataLimiteFim: any;

  id_turma: string;
  turma: TurmaList;
  qtd_registros: number;
  constructor(
    private turmaService: TurmaService,
    private recompensaService: RecompensaService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.id_turma = this.turmaService.returnIdTurma();
    this.turmaService.getTurmaById(this.id_turma).pipe(take(1)).subscribe(
      resp => {
        this.turma = resp;
      }
    )
    this.getRecompensas();
  }

  getRecompensas() {
    this.recompensaService.getRecompensaByTurma(this.id_turma).pipe(take(1)).subscribe(
      resp => {
        this.dataSource = new MatTableDataSource(resp);
        this.qtd_registros = this.dataSource.data.length;
      }
    )
  }

  onDelete(id_recompensa: string) {
    let confirmationDelete: boolean;

    const dialogRef = this.dialog.open(DialogMassageComponent, {
      data: { message: 'Tem certeza que deseja deletar esta recompensa?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      confirmationDelete = result;

      if (confirmationDelete) {
        this.recompensaService.delete(id_recompensa).pipe(take(1)).subscribe(
          resp => {
            this.snackBarService.openSnackBar('Recompensa exluída com sucesso!', 'X', false);
            this.getRecompensas();
          },
          error => {
            this.snackBarService.openSnackBar('Não foi possível excluir a recompensa', 'X', true);
          }
        );
      }
    });
  }

  openDialog() {
    let data_inicial = moment(this.turma.inicioRecompensa, "DD/MM/YYYY HH:mm");
    let data_final = moment(this.turma.fimRecompensa, "DD/MM/YYYY HH:mm");

    const dialogRef = this.dialog.open(DialogDataComponent, {
      data: {
        // data_inicio: data_inicial.format("YYYY/MM/DD"),
        // data_fim: data_final.format("YYYY/MM/DD"),
        // hora_inicio: data_inicial.format("HH:mm"),
        // hora_fim: data_final.format("HH:mm")
        turma: this.turma
      }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(result)
    //   console.log(this.dataLimiteInicio + ' ' + this.dataLimiteFim);
    // });
  }
}
