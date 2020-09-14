import { DialogMassageComponent } from './../../dialog-massage/dialog-massage.component';
import { AuthenticationService } from './../../../services/auth.service';
import { User } from './../../../models/user.model';
import { Router } from '@angular/router';
import { TurmaList } from './../turma.model';
import { TurmaService } from './../turma.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-turma-list',
  templateUrl: './turma-list.component.html',
  styleUrls: ['./turma-list.component.css']
})
export class TurmaListComponent implements OnInit {

  turmas: TurmaList[] = [];
  user: User;
  isTeacher: boolean;

  @Output() qtdTurmaEvent= new EventEmitter();

  constructor(
    private router: Router,
    private turmaService: TurmaService,
    private authService: AuthenticationService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.isTeacher = this.authService.isTeacher();
    this.qtdTurmaEvent.emit(this.turmas.length)
    this.getTurmas();
   

  }

  onDelete(id: string) {
    let confirmationDelete: boolean;

    const dialogRef = this.dialog.open(DialogMassageComponent, {
      data: { message: 'Tem certeza que quer deletar a turma?' }
    });

    dialogRef.afterClosed().subscribe(result => {

      confirmationDelete = result;

      if (confirmationDelete) {
        this.turmaService.deleteTurma(id).pipe(
          take(1)
        ).subscribe(
          resp => {
            this.snackBarService.openSnackBar('Turma excluída com sucesso!', 'X', false);
            this.getTurmas();
          },
          error => {
            this.snackBarService.openSnackBar('Não foi possível excluir a turma', 'X', true);
          })
      }
    })
  }

  getTurmas() {
    this.turmaService.getTurmas().pipe(
      take(1)
    ).subscribe(
      resp => {
        this.turmas = resp;
        this.qtdTurmaEvent.emit(this.turmas.length)
      },
      error => {
        this.turmas = [];
      }
    )
  }

}
