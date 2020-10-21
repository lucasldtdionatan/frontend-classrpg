import { AuthenticationService } from './../../../../services/auth.service';
import { SnackBarService } from './../../../../services/snack-bar.service';
import { DialogMassageComponent } from './../../../template/dialog-massage/dialog-massage.component';
import { TurmaService } from './../../../turma-home/turma-home.service';
import { NivelService } from './../nivel.service';
import { MatSort } from '@angular/material/sort';
import { Nivel } from './../nivel.model';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nivel',
  templateUrl: './nivel-list.component.html',
  styleUrls: ['./nivel-list.component.css']
})
export class NivelListComponent implements OnInit {

  dataSource: MatTableDataSource<Nivel>;
  displayedColumns: string[] = ['Imagem', 'Título', 'nivel.nivel', 'Pontuação mínima-máxima', 'Action'];

  isTeacher: boolean;
  qtd_registros: number;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private nivelService: NivelService,
    private turmaService: TurmaService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getNiveis();
    this.isTeacher = this.authenticationService.isTeacher();
  }

  getNiveis() {
    const idTurma = this.turmaService.returnIdTurma();
    this.nivelService.getByTuma(idTurma).pipe(take(1)).subscribe(
      resp => {
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.sort = this.sort;
        this.qtd_registros = this.dataSource.data.length;
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'nivel.nivel': return item.nivel;
            default: return item[property];
          }
        };
      }
    );
  }

  onDelete(id: string) {
    let confirmationDelete: boolean;

    const dialogRef = this.dialog.open(DialogMassageComponent, {
      data: { message: 'Tem certeza que deseja deletar este nível?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      confirmationDelete = result;

      if (confirmationDelete) {
        this.nivelService.deleteNivel(id).pipe(take(1)).subscribe(
          resp => {
            this.snackBarService.openSnackBar('Nível excluído com sucesso!', 'X', false);
            this.getNiveis();
          },
          error => {
            this.snackBarService.openSnackBar(error.error.mensagem, 'X', true);
          }
        );
      }
    })
  }
}
