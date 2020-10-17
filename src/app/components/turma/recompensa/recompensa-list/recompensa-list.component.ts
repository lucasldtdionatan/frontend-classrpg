import { DialogMassageComponent } from './../../../template/dialog-massage/dialog-massage.component';
import { SnackBarService } from './../../../../services/snack-bar.service';
import { take } from 'rxjs/operators';
import { RecompensaService } from './../recompensa.service';
import { TurmaService } from './../../../turma-home/turma-home.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { Recompensa } from '../recompensa.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-recompensa-list',
  templateUrl: './recompensa-list.component.html',
  styleUrls: ['./recompensa-list.component.css']
})
export class RecompensaListComponent implements OnInit {

  dataSource: MatTableDataSource<Recompensa>;
  displayedColumns: string[] = ['imagem', 'titulo', 'nivel', 'action'];

  id_turma: string;
  constructor(
    private turmaService: TurmaService,
    private recompensaService: RecompensaService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.id_turma = this.turmaService.returnIdTurma();
    this.getRecompensas();
  }

  getRecompensas() {
    this.recompensaService.getRecompensaByTurma(this.id_turma).pipe(take(1)).subscribe(
      resp => {
        this.dataSource = new MatTableDataSource(resp);
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
}
