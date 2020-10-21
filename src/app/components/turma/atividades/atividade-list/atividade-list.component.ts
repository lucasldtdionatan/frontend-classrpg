import { AuthenticationService } from './../../../../services/auth.service';
import { DialogMassageComponent } from './../../../template/dialog-massage/dialog-massage.component';
import { SnackBarService } from './../../../../services/snack-bar.service';
import { take } from 'rxjs/operators';
import { TurmaService } from './../../../turma-home/turma-home.service';
import { AtividadeService } from './../atividade.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { Atividade } from '../atividade.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-atividade-list',
  templateUrl: './atividade-list.component.html',
  styleUrls: ['./atividade-list.component.css']
})
export class AtividadeListComponent implements OnInit {

  dataSource: MatTableDataSource<Atividade>;
  displayedColumns: string[] = ['Título', 'Pontuacao', 'DataInicio', 'DataFinal', 'Action'];
  idTurma: string;
  qtd_registro: number;
  isTeacher: boolean;
  constructor(
    private atividadeService: AtividadeService,
    private turmaService: TurmaService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.isTeacher = this.authenticationService.isTeacher();
    this.idTurma = this.turmaService.returnIdTurma();
    this.getAtividades();

  }
  getAtividades() {
    this.atividadeService.getAtividades(this.idTurma).subscribe(
      resp => {
        this.dataSource = new MatTableDataSource(resp);
        this.qtd_registro = this.dataSource.data.length;
      },
      error => {

      }
    )
  }
  onDelete(id: string) {
    let confirmationDelete: boolean;

    const dialogRef = this.dialog.open(DialogMassageComponent, {
      data: { message: 'Tem certeza que deseja deletar esta atividade?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      confirmationDelete = result;

      if (confirmationDelete) {
        this.atividadeService.deteleAtividade(id).pipe(take(1)).subscribe(
          resp => {
            this.snackBarService.openSnackBar('Atividade excluída com sucesso!', 'X', false);
            this.getAtividades();
          },
          error => {
            this.snackBarService.openSnackBar('Não foi possível excluir a atividade!', 'X', true);
          }
        )
      }
    });


  }

}
