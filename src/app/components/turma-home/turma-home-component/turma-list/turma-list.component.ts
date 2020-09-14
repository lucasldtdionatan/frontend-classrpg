import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { AuthenticationService } from './../../../../services/auth.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { TurmaService } from './../../turma-home.service';

import { TurmaList } from './../../turma-home.model';
import { User } from './../../../../models/user.model';

import { DialogMassageComponent } from './../../../template/dialog-massage/dialog-massage.component';

@Component({
  selector: 'app-turma-list',
  templateUrl: './turma-list.component.html',
  styleUrls: ['./turma-list.component.css']
})
export class TurmaListComponent implements OnInit {

  turmas: TurmaList[] = [];
  user: User;
  isTeacher: boolean;


  constructor(
    private router: Router,
    private turmaService: TurmaService,
    private authService: AuthenticationService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.isTeacher = this.authService.isTeacher();

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
      },
      error => {
        this.turmas = [];
      }
    )
  }

}
