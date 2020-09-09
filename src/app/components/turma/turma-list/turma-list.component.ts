import { AuthenticationService } from './../../../services/auth.service';
import { User } from './../../../models/user.model';
import { Router } from '@angular/router';
import { TurmaList } from './../turma.model';
import { TurmaService } from './../turma.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { repeat } from 'rxjs/operators';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-turma-list',
  templateUrl: './turma-list.component.html',
  styleUrls: ['./turma-list.component.css']
})
export class TurmaListComponent implements OnInit {

  turmas: TurmaList[];
  user: User;
  isTeacher: boolean;

  constructor(
    private router: Router,
    private turmaService: TurmaService,
    private authService: AuthenticationService,
    private snackBarService: SnackBarService,

  ) { }

  ngOnInit(): void {
    this.isTeacher = this.authService.isTeacher();

    this.turmaService.getTurmas().subscribe(
      resp => {
        this.turmas = resp;
      })
  }

  onDelete(id: string) {
    this.turmaService.deleteTurma(id).subscribe(
      resp => {
        this.snackBarService.openSnackBar('Turma excluída com sucesso!', 'X', false);
      },
      error => {
        this.snackBarService.openSnackBar('Não foi possível excluir a turma', 'X', true);
      })
  }

  navigate() {
    // this.router.navigate(['/novaturma']);
  }

}
